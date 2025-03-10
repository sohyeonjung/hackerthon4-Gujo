package org.gujo.poppul.quiz.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gujo.poppul.answer.entity.Answer;
import org.gujo.poppul.answer.repository.AnswerStreamRepository;
import org.gujo.poppul.answer.service.AnswerStreamService;
import org.gujo.poppul.question.entity.Question;
import org.gujo.poppul.question.service.QuestionStreamService;
import org.gujo.poppul.quiz.dto.QuizStreamResponse;
import org.gujo.poppul.quiz.entity.Quiz;
import org.gujo.poppul.quiz.repository.EmitterRepository;
import org.gujo.poppul.quiz.repository.QuizStreamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
public class QuizStreamService {

    @Autowired
    private QuizStreamRepository quizStreamRepository;
    @Autowired
    private QuestionStreamService questionStreamService;
    @Autowired
    private EmitterRepository emitterRepository;


    HashMap<Long, Integer> pinList = new HashMap<>();

    //이벤트 구독 허용, PIN 전달
    public SseEmitter createQuiz(Long quizId) {
        // 4자리 랜덤 PIN 생성
        int pin = (int)(Math.random() * 9000) + 1000;

        //각 퀴즈에 대한 점수 저장
        //scores.put(pin, new HashMap<>());
        //TODO USER와 연결해야함
        var emitter = subscribe(quizId, "admin");
        pinList.put(quizId, pin);
        return emitter;
    }
    //문제 출제 시작
    public void startQuiz(Long quizId) {

        //quiz찾기
        Quiz quiz = quizStreamRepository.findById(quizId).orElse(null);

        log.info("Starting quiz {}", quizId);
        if (quiz == null) {
            throw new IllegalArgumentException("Quiz not found for id: " + quizId);
        }




        log.info("Quiz {} already started", quizId);

        //quiz_id가 같은 접속 유저들에게 퀴즈 보여주기 시작
        Collection<SseEmitter> sseEmitters = emitterRepository.findByQuizId(quizId);

        for (SseEmitter sseEmitter : sseEmitters) {

            try {
                for(Question question : quiz.getQuestionList()){
                    //문제 출제자 용 화면
                    Map<String, Object> ddata = new HashMap<>();
                    ddata.put("question", question);

                    Map<Integer, String> admin = new HashMap<>();
                    for (Answer answer : question.getAnswerList()) {
                        admin.put(answer.getNo(), answer.getContent());
                    }
                    ddata.put("answers", admin);
                    SseEmitter adminsse = emitterRepository.findByName("admin");
                    adminsse.send(
                            SseEmitter.event()
                                    .name("admin question")
                                    .data(ddata)
                    );
                    log.info("admin sent");

                    if(!emitterRepository.findByUsername("root")){
                        //문제 푸는 사람 용 화면
                        Map<String, Object> data = new HashMap<>();
                        data.put("question", question.getTitle());
                        log.info("Question: " + question.getTitle());

                        List<Integer> a = new ArrayList<>();
                        for(int i=1; i<=question.getAnswerList().size(); i++){
                            a.add(i);
                        }
                        data.put("answers", a);

                        //데이터 전송
                        sseEmitter.send(
                                SseEmitter.event()
                                        .name("question")
                                        .data(data)
                        );
                        log.info("SseEmitter sent");
                    }


                    Thread.sleep(10000);  // 10초마다 갱신
                }

            } catch (IOException | InterruptedException e) {
                // 오류 발생 시 emitter를 제거
                emitterRepository.deleteByName(sseEmitter.getClass().getName());
                throw new RuntimeException("연결 오류");
            }
        }
    }


    //quizid로 quiz찾기
    public Optional<QuizStreamResponse> getQuizById(Long quizId) {
        Quiz quiz = quizStreamRepository.findById(quizId).orElse(null);
        return Optional.ofNullable(toDto(quiz));
    }




    ///--- 클라이언트
    public SseEmitter subscribe(Long quizId, String username){
        //TODO pin 검사
        //timeout 없는 sse생성
        SseEmitter sseEmitter =  emitterRepository.save(quizId, username, new SseEmitter(-1L));
        // 연결이 끊기면 자동 삭제
        sseEmitter.onCompletion(() -> {
            log.info("SseEmitter 연결 종료: {}", username);
            emitterRepository.deleteByName(username);
        });
        sseEmitter.onTimeout(() -> {
            log.info("SseEmitter 타임아웃: {}", username);
            emitterRepository.deleteByName(username);
        });
        //첫 구독시 이벤트 발생
        broadcast(username, "subscribe complete, username: "+username);


        return sseEmitter;
    }

    public void broadcast(String username, Object object){

        SseEmitter sseEmitter = emitterRepository.findByName(username);

        try{
            sseEmitter.send(
                    SseEmitter.event()
                            .id(username)
                            .name("question")
                            .data(object)
            );

        }catch(IOException e){
            emitterRepository.deleteByName(username);
            throw new RuntimeException("연결 오류");
        }
    }





    //Converter
    private QuizStreamResponse toDto(Quiz quiz){

        var questionList = quiz.getQuestionList()
                .stream().map(it->questionStreamService.toDto(it)).collect(Collectors.toList());

        return QuizStreamResponse.builder()
                .id(quiz.getId())
                .title(quiz.getTitle())
                .questionList(questionList)
                .build();
    }



}

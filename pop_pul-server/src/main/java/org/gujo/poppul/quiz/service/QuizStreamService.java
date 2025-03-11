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
            log.info("pin: "+pin);
    
            pinList.put(quizId, pin);
            //TODO USER와 연결해야함
            var emitter = subscribe(quizId, "admin",pin);
            return emitter;
        }

        //문제 출제 시작
        @Transactional
        public void startQuiz(Long quizId) {
    
    
            //quiz찾기
            Quiz quiz = quizStreamRepository.findById(quizId).orElse(null);
    
            log.info("Starting quiz {}", quizId);
            if (quiz == null) {
                throw new IllegalArgumentException("Quiz not found for id: " + quizId);
            }
    
            log.info("Quiz {} already started", quizId);

            // LazyInitializationException 방지- Question 리스트를 미리 가져옴
            List<Question> questions = quiz.getQuestionList();
            log.info("Loaded {} questions", questions.size());

            for (Question question : questions) {
                log.info("Question: " + question.getTitle());
            }
    
            //quiz_id가 같은 접속 유저들에게 퀴즈 보여주기 시작
            Collection<SseEmitter> sseEmitters = emitterRepository.findByQuizId(quizId);

            for(Question question : quiz.getQuestionList()){
                try{
                    //문제 출제자 용 데이터
                    Map<String, Object> adminData = new HashMap<>();
                    adminData.put("question", question.getTitle());

                    Map<Integer, String> answerMap = new HashMap<>();
                    for (Answer answer : question.getAnswerList()) {
                        answerMap.put(answer.getNo(), answer.getContent());
                    }
                    adminData.put("answers", answerMap);

                    //일반 용 데이터(정답 없이 숫자만)
                    Map<String, Object> userData = new HashMap<>();
                    userData.put("question", question.getTitle());

                    List<Integer> answerNumbers = new ArrayList<>();
                    for (int i = 1; i <= question.getAnswerList().size(); i++) {
                        answerNumbers.add(i);
                    }
                    userData.put("answers", answerNumbers);

                    //사용자에게 데이터 전송
                    for (SseEmitter sseEmitter : sseEmitters) {
                        String username = emitterRepository.findUsernameByEmitter(sseEmitter); // 해당 SseEmitter의 username 찾기
                        if ("admin".equals(username)) {
                            log.info("Sending question to admin: " + question.getTitle());
                            sseEmitter.send(SseEmitter.event().name(String.valueOf(question.getId())).data(adminData));
                        } else {
                            log.info("Sending question to user: " + question.getTitle());
                            sseEmitter.send(SseEmitter.event().name(String.valueOf(question.getId())).data(userData));
                        }
                    }
                    Thread.sleep(10000); //10초

                } catch (IOException | InterruptedException e) {
                     //오류 발생 시 emitter를 제거
                    //emitterRepository.deleteByName(sseEmitter.getClass().getName());
                    throw new RuntimeException("연결 오류");
                }
            }
//            for (SseEmitter sseEmitter : sseEmitters) {
//
//                try {
//                    for(Question question : quiz.getQuestionList()){
//                        //문제 출제자 용 화면
//                        Map<String, Object> ddata = new HashMap<>();
//                        ddata.put("question", question.getTitle());
//
//                        Map<Integer, String> admin = new HashMap<>();
//                        for (Answer answer : question.getAnswerList()) {
//                            admin.put(answer.getNo(), answer.getContent());
//                        }
//                        ddata.put("answers", admin);
//                        SseEmitter adminSse = emitterRepository.findByName("admin");
//                        adminSse.send(
//                                SseEmitter.event()
//                                        .name(String.valueOf(question.getId()))
//                                        .data(ddata)
//                        );
//                        log.info("admin sent");
//
//                        if(!emitterRepository.findByUsername("admin")){
//                            //문제 푸는 사람 용 화면
//                            Map<String, Object> data = new HashMap<>();
//                            data.put("question", question.getTitle());
//                            log.info("Question: " + question.getTitle());
//
//                            List<Integer> a = new ArrayList<>();
//                            for(int i=1; i<=question.getAnswerList().size(); i++){
//                                a.add(i);
//                            }
//                            data.put("answers", a);
//
//                            //데이터 전송
//                            sseEmitter.send(
//                                    SseEmitter.event()
//                                            .name(String.valueOf(question.getId()))
//                                            .data(data)
//                            );
//                            log.info("SseEmitter sent");
//                        }
//
//
//                        Thread.sleep(10000);  // 10초마다 갱신
//                    }
//
//                } catch (IOException | InterruptedException e) {
//                    // 오류 발생 시 emitter를 제거
//                    emitterRepository.deleteByName(sseEmitter.getClass().getName());
//                    throw new RuntimeException("연결 오류");
//                }
//            }
        }
    
    
        //quizid로 quiz찾기
        public Optional<QuizStreamResponse> getQuizById(Long quizId) {
            Quiz quiz = quizStreamRepository.findById(quizId).orElse(null);
            return Optional.ofNullable(toDto(quiz));
        }
    
    
    
    
        ///--- 클라이언트
        public SseEmitter subscribe(Long quizId, String username, Integer pin){
            //pin 검사
            log.info("pin: "+pin);
    
            if (!pinList.containsKey(quizId) || !pinList.get(quizId).equals(pin)) {
                throw new IllegalArgumentException("Invalid PIN for quiz ID: " + quizId);
            }
    
            //timeout 없는 sse생성
            SseEmitter sseEmitter =  emitterRepository.save(quizId, username, pin, new SseEmitter(-1L));
            // 연결이 끊기면 자동 삭제
            sseEmitter.onCompletion(() -> {
                log.info("SseEmitter 연결 종료: {}", username);
                emitterRepository.deleteByName(username);
            });
            sseEmitter.onTimeout(() -> {
                log.info("SseEmitter 타임아웃: {}", username);
                emitterRepository.deleteByName(username);
            });
    
            //pin번호 공개
            if(username=="admin"){
                broadcast(username, "pin: "+pin);
            }
            else{
                //첫 구독시 이벤트 발생
                broadcast(username, "subscribe complete, username: "+username);
            }

            // 퀴즈가 아직 시작되지 않았다면 자동 시작
            new Thread(() -> {
                try {
                    Thread.sleep(2000); // 2초 대기 후 시작
                    startQuiz(quizId);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }).start();
    
    
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

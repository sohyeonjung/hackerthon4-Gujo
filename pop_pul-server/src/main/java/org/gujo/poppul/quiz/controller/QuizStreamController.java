package org.gujo.poppul.quiz.controller;


import jakarta.websocket.server.PathParam;
import lombok.extern.slf4j.Slf4j;
import org.gujo.poppul.quiz.service.QuizStreamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@RestController
@RequestMapping("/api/quiz")
public class QuizStreamController {

    @Autowired
    private QuizStreamService quizStreamService;

    //TODO
    //문제 출제 (PIN 번호)
    @GetMapping(value = "/create", produces = "text/event-stream")
    public SseEmitter createQuiz(
            @RequestParam Long quizId
    ){
        return quizStreamService.createQuiz(quizId);
    }

    //문제 출제 시작
    @GetMapping("/start/{quizId}")
    public ResponseEntity<Void> startQuiz(
            @PathVariable Long quizId
    ){
        //SseEmitter emitter = new SseEmitter();
        //emitters.put(pin, emitter);
        //SSE로 문제 전송 시작
        quizStreamService.startQuiz(quizId);
        return ResponseEntity.ok().build();
    }



    ///--- 클라이언트---

    //문제 풀기 접속
    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(
            @RequestParam Long quizId,
            @RequestParam Integer pin,
            @RequestParam String username
    ){
        return quizStreamService.subscribe(quizId, username, pin);
    }
    //이벤트 구독 중인 클라이언트에게 데이터 전송
    @PostMapping("/broadcast")
    public void broadcast(
            @RequestParam Long quizId,
            @RequestParam String username
    ){
        quizStreamService.broadcast(username, "데이터 전송완료, username: "+username);
    }



//    //SSE를 통한 실시간 퀴즈 전달
//    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//    public ResponseEntity<SseEmitter> streamQuiz(@RequestParam Long quizId) {
//
//        SseEmitter emitter = new SseEmitter();
//        Thread thread = new Thread(() -> {
//            try {
//                while (true) {
//                    var quiz = quizStreamService.getQuizById(quizId);
//                    List<QuestionStreamResponse> questions = quiz.get().getQuestionList();
//
//                    for (QuestionStreamResponse question : questions) {
//                        List<AnswerStreamResponse> answers =  question.getAnswerList();
//                        log.info("List: ", answers);
//                        log.info("question:",question.getTitle());
//
//                        Map<String, Object> quizData = new HashMap<>();
//                        quizData.put("question: ", question.getTitle());
//                        quizData.put("answers", answers);
//
//                        log.info("Quiz: {}\n", quizData);
//
//                        emitter.send(quizData);  // 클라이언트에게 QuizDto 전송
//
//
//                    }
//                    Thread.sleep(10000);  // 10초마다 갱신
//                }
//            } catch (Exception e) {
//                emitter.completeWithError(e);
//            }
//        });
//        thread.start();
//        return ResponseEntity.ok(emitter);
//    }




}

package org.gujo.poppul.quiz.controller;


import lombok.RequiredArgsConstructor;
import org.gujo.poppul.quiz.dto.QuizStreamResponse;
import org.gujo.poppul.quiz.service.QuizStreamService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quiz")
public class QuizStreamController {

    private QuizStreamService quizStreamService;

    //SSE를 통한 실시간 퀴즈 전달
    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamQuiz() {
        SseEmitter emitter = new SseEmitter();
        Thread thread = new Thread(() -> {
            try {
                while (true) {
                    List<QuizStreamResponse> quizzes = quizStreamService.getQuiz(); // QuizDto 목록을 가져옴
                    for (QuizStreamResponse quiz : quizzes) {
                        emitter.send(quiz);  // 클라이언트에게 QuizDto 전송
                    }
                    Thread.sleep(10000);  // 10초마다 갱신
                }
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        });
        thread.start();
        return emitter;
    }

}

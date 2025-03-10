package org.gujo.poppul.quiz.controller;


import lombok.RequiredArgsConstructor;
import org.gujo.poppul.answer.dto.AnswerStreamResponse;
import org.gujo.poppul.question.dto.QuestionStreamResponse;
import org.gujo.poppul.quiz.dto.QuizStreamResponse;
import org.gujo.poppul.quiz.service.QuizStreamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
public class QuizStreamController {

    @Autowired
    private QuizStreamService quizStreamService;

    //SSE를 통한 실시간 퀴즈 전달
    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamQuiz(@RequestParam Long quizId) {
        SseEmitter emitter = new SseEmitter();
        Thread thread = new Thread(() -> {
            try {
                while (true) {
                    var quiz = quizStreamService.getQuizById(quizId);
                    List<QuestionStreamResponse> questions = quiz.get().getQuestionList();

                    for (QuestionStreamResponse question : questions) {
                        List<AnswerStreamResponse> answers =  question.getAnswerList();

                        Map<String, Object> quizData = new HashMap<>();
                        quizData.put("question", question.getName());
                        quizData.put("answers", answers);

                        emitter.send(quizData);  // 클라이언트에게 QuizDto 전송
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

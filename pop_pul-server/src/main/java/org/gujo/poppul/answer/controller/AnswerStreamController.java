package org.gujo.poppul.answer.controller;

import lombok.RequiredArgsConstructor;
import org.gujo.poppul.answer.service.AnswerStreamService;
import org.gujo.poppul.quiz.service.QuizStreamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/quiz")
public class AnswerStreamController {
    // 유저의 답을 처리하여 정답 여부를 반환
    private AnswerStreamService answerStreamService;

    @PostMapping("/answer")
    public ResponseEntity<String> submitAnswer(@RequestParam Long questionId, @RequestParam String answer) {
        // questionId를 기반으로 정답을 확인
        boolean isCorrect = answerStreamService.checkAnswer(questionId, answer);

        if (isCorrect) {
            return ResponseEntity.ok("정답입니다!");
        } else {
            return ResponseEntity.ok("틀렸습니다!");
        }
    }
}

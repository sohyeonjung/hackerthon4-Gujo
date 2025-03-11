package org.gujo.poppul.answer.controller;

import lombok.RequiredArgsConstructor;
import org.gujo.poppul.answer.service.AnswerStreamService;
import org.gujo.poppul.quiz.entity.ParticipantManager;
import org.gujo.poppul.quiz.service.QuizStreamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/quiz")
public class AnswerStreamController {
    // 유저의 답을 처리하여 정답 여부를 반환

    @Autowired
    private AnswerStreamService answerStreamService;
    private ParticipantManager participantManager;


    //퀴즈 참가자가 답변 제출
    @PostMapping("/answer")
    public ResponseEntity<String> submitAnswer(
            @RequestParam String username,
            @RequestParam Long questionId,
            @RequestParam String answer
    ) {
        // questionId를 기반으로 정답을 확인
        boolean isCorrect = answerStreamService.checkAnswer(questionId, answer);

        if (isCorrect) {
            participantManager.updateScore(username, 10);
            return ResponseEntity.ok("정답");
        } else {
            return ResponseEntity.ok("오답");
        }
    }
}

package org.gujo.poppul.answer.service;

import org.gujo.poppul.answer.dto.AnswerStreamResponse;
import org.gujo.poppul.answer.entity.Answer;
import org.gujo.poppul.answer.repository.AnswerStreamRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AnswerStreamService {

    private AnswerStreamRepository answerStreamRepository;

    //사용자 답안 체크
    public boolean checkAnswer(Long questionId, String answer) {

        Optional<Answer> correctAnswer = answerStreamRepository.findByQuestionIdAndIsAnswerTrue(questionId);
        if (correctAnswer.isPresent()) {
            return correctAnswer.get().getContent().equals(answer);  // 정답 비교
        }
        return false;  // 정답이 없으면 false 반환
    }

    //converter
    public AnswerStreamResponse toDto(Answer answer){
        return AnswerStreamResponse.builder()
                .id(answer.getId())
                .no(answer.getNo())
                .content(answer.getContent())
                .is_answer(answer.is_answer())
                .questionId(answer.getQuestion().getId())
                .build();
    }


}

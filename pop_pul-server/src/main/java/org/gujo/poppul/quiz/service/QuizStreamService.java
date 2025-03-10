package org.gujo.poppul.quiz.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.gujo.poppul.answer.entity.Answer;
import org.gujo.poppul.answer.repository.AnswerStreamRepository;
import org.gujo.poppul.answer.service.AnswerStreamService;
import org.gujo.poppul.question.service.QuestionStreamService;
import org.gujo.poppul.quiz.dto.QuizStreamResponse;
import org.gujo.poppul.quiz.entity.Quiz;
import org.gujo.poppul.quiz.repository.QuizStreamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class QuizStreamService {

    @Autowired
    private QuizStreamRepository quizStreamRepository;
    @Autowired
    private QuestionStreamService questionStreamService;


    //퀴즈의 문제목록 가져옴
    public List<QuizStreamResponse> getQuiz(){
        var quiz = quizStreamRepository.findAll();
        return quiz.stream().map(it->toDto(it)).collect(Collectors.toList());
    }

    //quizid로 quiz찾기
    public Optional<QuizStreamResponse> getQuizById(Long quizId) {
        Quiz quiz = quizStreamRepository.findById(quizId).orElse(null);
        return Optional.ofNullable(toDto(quiz));
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

package org.gujo.poppul.quiz.repository;

import org.gujo.poppul.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizStreamRepository extends JpaRepository<Quiz, Long> {

}

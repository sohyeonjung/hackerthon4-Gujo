package org.gujo.poppul.question.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.gujo.poppul.answer.entity.Answer;
import org.gujo.poppul.quiz.entity.Quiz;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity
@Table(name = "Question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String images;
    //@JsonIgnore
    //@ToString.Exclude
    @ManyToOne()
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @Builder.Default
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answerList = new ArrayList<>();

}

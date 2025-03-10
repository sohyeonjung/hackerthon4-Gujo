package org.gujo.poppul.quiz.entity;
import jakarta.persistence.*;
import lombok.*;
import org.gujo.poppul.question.entity.Question;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity
@Table(name = "Quiz")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title; // 퀴즈 제목
    @Column
    private Long user_id;

    @Builder.Default
    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questionList = new ArrayList<>();


}
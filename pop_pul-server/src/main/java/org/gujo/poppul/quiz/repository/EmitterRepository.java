package org.gujo.poppul.quiz.repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
public class EmitterRepository {

    //SseEmitter 객체 관리
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    //quiz_id별로 해당하는 username을 저장
    private final Map<Long, List<String>> info = new ConcurrentHashMap<>();

    //퀴즈 접속자 이름으로 boardcast를 위해 구독 중인 사용자의 SseEmitter 조회
    public SseEmitter findByName(String username) {
        return emitters.get(username);
    }

    //quizid별 user 구하기
    public Collection<SseEmitter> findByQuizId(Long quizId) {
        List<String> usernames = info.get(quizId);
        if (usernames != null) {
            return usernames.stream()
                    .map(emitters::get)
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    //특정 유저인지 찾기
    public boolean findByUsername(String username) {
        return emitters.containsKey(username);
    }

    public SseEmitter findByUsername(String username, Long quizId) {
        return emitters.get(username);
    }

    //접속사 저장
    public SseEmitter save(Long quizId, String username, SseEmitter emitter) {
        emitters.put(username, emitter);
        info.computeIfAbsent(quizId, k -> new ArrayList<>()).add(username);
        return emitters.get(username);
    }

    //접속자 삭제
    public void deleteByName(String username) {
        emitters.remove(username);
        info.forEach((quizId, usernames) -> usernames.remove(username));
    }

    public Collection<SseEmitter> values() {
        return emitters.values();
    }


}

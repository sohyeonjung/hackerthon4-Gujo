package org.gujo.poppul.user.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gujo.poppul.user.dto.UserRequest;
import org.gujo.poppul.user.dto.UserResponse;
import org.gujo.poppul.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserRequest userRequest) {
        UserResponse response = userService.register(userRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody UserRequest userRequest, HttpSession session) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userRequest.getId(), userRequest.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserResponse response = UserResponse.builder()
                    .id(userRequest.getId())
                    .name(userRequest.getId())
                    .success(true)
                    .message("로그인 성공")
                    .build();

            session.setAttribute("user", response);
            log.info("User logged in: {}", userRequest.getId());
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            return ResponseEntity.ok(
                    UserResponse.builder()
                            .success(false)
                            .message("ID 또는 비밀번호가 틀렸습니다.")
                            .build()
            );
        }
    }
}
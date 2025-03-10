package org.gujo.poppul.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gujo.poppul.user.dto.UserRequest;
import org.gujo.poppul.user.dto.UserResponse;
import org.gujo.poppul.user.entity.User;
import org.gujo.poppul.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse register(UserRequest userRequest) {
        User existingUser = userRepository.findById(userRequest.getId()).orElse(null);
        if (existingUser != null) {
            return UserResponse.builder()
                    .success(false)
                    .message("이미 존재하는 ID입니다.")
                    .build();
        }

        User user = User.builder()
                .id(userRequest.getId())
                .name(userRequest.getId())
                .password(passwordEncoder.encode(userRequest.getPassword())) // Uses BCrypt
                .build();

        userRepository.save(user);
        log.info("User registered: {}", user.getId());

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .success(true)
                .message("회원가입 성공")
                .build();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getId())
                .password(user.getPassword())
                .roles("USER")
                .build();
    }
}
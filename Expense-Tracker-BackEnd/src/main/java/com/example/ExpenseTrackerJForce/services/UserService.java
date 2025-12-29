package com.example.ExpenseTrackerJForce.services;

import com.example.ExpenseTrackerJForce.model.User;
import com.example.ExpenseTrackerJForce.repository.UserRepository;
import com.example.ExpenseTrackerJForce.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(
            UserRepository repo,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // ✅ Register user
    public void saveUser(User user) {
        String encodedPassword =
                passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        repo.save(user);
    }

    // ✅ Admin / debug
    public List<User> showAllUsers() {
        return repo.findAll();
    }

    // ✅ JWT-based login
    public String login(String email, String password) {

        User user = repo.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // 🔐 Generate JWT
        return jwtUtil.generateToken(user.getEmail());
    }
}

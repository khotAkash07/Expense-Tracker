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

    public UserService(UserRepository repo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repo.save(user);
    }

    public User findByEmail(String email) {
        return repo.findByEmail(email);
    }

    public List<User> showAllUsers() { return repo.findAll(); }
}
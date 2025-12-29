package com.example.ExpenseTrackerJForce.services;

import com.example.ExpenseTrackerJForce.model.User;
import com.example.ExpenseTrackerJForce.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private final UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public void saveUser(User user) {
        // Hash password before saving
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        repo.save(user);
    }

    public List<User> showAllUsers() {
        return repo.findAll();
    }

    public User login(String email, String password) {
        User u = repo.findByEmail(email);
        if (u != null && passwordEncoder.matches(password, u.getPassword())) {
            return u;
        }
        return null;
    }
}
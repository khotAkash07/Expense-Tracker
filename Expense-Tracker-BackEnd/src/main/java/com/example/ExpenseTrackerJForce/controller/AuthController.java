package com.example.ExpenseTrackerJForce.controller;

import com.example.ExpenseTrackerJForce.model.User;
import com.example.ExpenseTrackerJForce.services.UserService;
import com.example.ExpenseTrackerJForce.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            // Authenticate user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }

        // Load user details and generate token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        // Get user info
        User loggedInUser = userService.login(user.getEmail(), user.getPassword());

        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
        response.put("message", "Login successful");
        response.put("user", loggedInUser);

        return ResponseEntity.ok(response);
    }
}

package com.example.ExpenseTrackerJForce.controller;

import com.example.ExpenseTrackerJForce.model.User;
import com.example.ExpenseTrackerJForce.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/addUser")
    public ResponseEntity<?> saveUser(@RequestBody User user){
        try {
            userService.saveUser(user);
            return ResponseEntity.ok().body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @GetMapping("/allUsers")
    public List<User> showUsers(){
        return userService.showAllUsers();
    }

    @PostMapping("/userLogin")
    public User login(@RequestBody User user){
        return userService.login(user.getEmail(), user.getPassword());
    }
}

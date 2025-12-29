package com.example.ExpenseTrackerJForce.controller;

import com.example.ExpenseTrackerJForce.model.User;
import com.example.ExpenseTrackerJForce.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/addUser")
    public void saveUser(@RequestBody User user){
        userService.saveUser(user);
    }

    @GetMapping("/allUsers")
    public List<User> showUsers(){
        return userService.showAllUsers();
    }

}

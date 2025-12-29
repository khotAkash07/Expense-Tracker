package com.example.ExpenseTrackerJForce.controller;

import com.example.ExpenseTrackerJForce.dto.ExpenseDTO;
import com.example.ExpenseTrackerJForce.model.Expensee;
import com.example.ExpenseTrackerJForce.services.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expense")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // Add expense for userId
    @PostMapping("/addExpense/{userId}")
    public ResponseEntity<?> addExpense(@PathVariable Long userId, @RequestBody Expensee ex) {
        try {
            Expensee savedExpense = expenseService.addExpense(userId, ex);
            return ResponseEntity.ok(savedExpense);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/deleteExpense/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id) {
        try {
            expenseService.deleteExpense(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting expense: " + e.getMessage());
        }
    }

    // Update expense
    @PutMapping
    public void updateExpense(@RequestBody Expensee ex) {
            expenseService.updateExpense(ex);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserExpenses(@PathVariable Long userId) {
        try {
            List<ExpenseDTO> expenses = expenseService.getExpensesByUser(userId);
            return ResponseEntity.ok(expenses);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

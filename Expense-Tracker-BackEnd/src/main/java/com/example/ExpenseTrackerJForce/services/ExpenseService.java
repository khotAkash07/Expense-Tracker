package com.example.ExpenseTrackerJForce.services;

import com.example.ExpenseTrackerJForce.dto.ExpenseDTO;
import com.example.ExpenseTrackerJForce.model.Expensee;
import com.example.ExpenseTrackerJForce.model.User;
import com.example.ExpenseTrackerJForce.repository.ExpenseRepository;
import com.example.ExpenseTrackerJForce.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepo;
    private final UserRepository userRepo;

    public ExpenseService(
            ExpenseRepository expenseRepo,
            UserRepository userRepo
    ) {
        this.expenseRepo = expenseRepo;
        this.userRepo = userRepo;
    }

    public Expensee addExpense(Long userId, Expensee ex) {
        User user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found with id: " + userId)
                );
        ex.setUser(user);
        return expenseRepo.save(ex);
    }

    public void deleteExpense(Long id) {
        if (!expenseRepo.existsById(id)) {
            throw new RuntimeException("Expense not found with id: " + id);
        }
        expenseRepo.deleteById(id);
    }

    public Expensee updateExpense(Expensee ex) {
        return expenseRepo.save(ex);
    }

    @Transactional(readOnly = true)
    public List<ExpenseDTO> getExpensesByUser(Long userId) {

        if (!userRepo.existsById(userId)) {
            throw new RuntimeException("User not found with id: " + userId);
        }

        return expenseRepo.findByUser_Id(userId)
                .stream()
                .map(expense -> new ExpenseDTO(
                        expense.getId(),
                        expense.getName(),
                        expense.getAmount(),
                        expense.getDate(),
                        expense.getDescription()
                ))
                .collect(Collectors.toList());
    }
}

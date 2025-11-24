package com.example.ExpenseTrackerJForce.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class ExpenseDTO {
    // Getters and Setters
    private Long id;
    private String name;
    private int amount;
    private LocalDate date;
    private String description;

    public ExpenseDTO() {}

    public ExpenseDTO(Long id, String name, int amount, LocalDate date, String description) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }

}
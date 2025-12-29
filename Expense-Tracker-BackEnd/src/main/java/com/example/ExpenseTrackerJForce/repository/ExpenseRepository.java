package com.example.ExpenseTrackerJForce.repository;

import com.example.ExpenseTrackerJForce.model.Expensee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expensee, Long> {
    List<Expensee> findByUser_Id(Long userId);
}
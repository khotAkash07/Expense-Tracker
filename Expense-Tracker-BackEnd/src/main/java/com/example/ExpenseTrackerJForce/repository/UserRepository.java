package com.example.ExpenseTrackerJForce.repository;

import com.example.ExpenseTrackerJForce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}

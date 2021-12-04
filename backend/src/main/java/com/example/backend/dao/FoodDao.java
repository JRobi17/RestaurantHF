package com.example.backend.dao;

import com.example.backend.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodDao extends JpaRepository<Food, String> {
}

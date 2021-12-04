package com.example.backend.dao;

import com.example.backend.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantDao extends JpaRepository<Restaurant, String> {
}

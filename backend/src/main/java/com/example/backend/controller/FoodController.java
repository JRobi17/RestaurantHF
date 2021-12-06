package com.example.backend.controller;

import com.example.backend.model.Food;
import com.example.backend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.List;

@RestController
public class FoodController {

    @Autowired
    private FoodService foodService;

    @PostConstruct
    public void initFood() {
        foodService.initFood();
    }

    @GetMapping("/getAllFoods")
    public List<Food> getAllFoods() { return foodService.getAllFoods(); }
}

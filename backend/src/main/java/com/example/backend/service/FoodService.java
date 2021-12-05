package com.example.backend.service;

import com.example.backend.dao.FoodDao;
import com.example.backend.model.Food;
import com.example.backend.model.FoodType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodDao foodDao;

    public void initFood() {

        /*
        Food food1 = new Food();
        food1.setName("Marhagulyás");
        food1.setFoodType(FoodType.APPETIZER);
        food1.setPrice(1200);
        foodDao.save(food1);

        Food food2 = new Food();
        food2.setName("Csirke burrito");
        food2.setFoodType(FoodType.MAINCOURSE);
        food2.setPrice(2400);
        foodDao.save(food2);

        Food food3 = new Food();
        food3.setName("Tiramisu");
        food3.setFoodType(FoodType.DESSERT);
        food3.setPrice(700);
        foodDao.save(food3);

        Food food4 = new Food();
        food4.setName("Coca Cola");
        food4.setFoodType(FoodType.DRINK);
        food4.setPrice(390);
        foodDao.save(food4);
        */
    }

    public List<Food> getAllFoods() {
        return foodDao.findAll();
    }
}

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

        Food food5 = new Food();
        food5.setName("Churros");
        food5.setFoodType(FoodType.DESSERT);
        food5.setPrice(900);
        foodDao.save(food5);

        Food food6 = new Food();
        food6.setName("Somlói galuska");
        food6.setFoodType(FoodType.DESSERT);
        food6.setPrice(1000);
        foodDao.save(food6);

        Food food7 = new Food();
        food7.setName("Ponty halászlé");
        food7.setFoodType(FoodType.APPETIZER);
        food7.setPrice(1800);
        foodDao.save(food7);

        Food food8 = new Food();
        food8.setName("Cheddar sajtkrémleves");
        food8.setFoodType(FoodType.APPETIZER);
        food8.setPrice(1000);
        foodDao.save(food8);

        Food food9 = new Food();
        food9.setName("Rántott csirkemell");
        food9.setFoodType(FoodType.MAINCOURSE);
        food9.setPrice(2000);
        foodDao.save(food9);

        Food food10 = new Food();
        food10.setName("Carbonara");
        food10.setFoodType(FoodType.MAINCOURSE);
        food10.setPrice(1900);
        foodDao.save(food10);

        Food food11 = new Food();
        food11.setName("Fanta");
        food11.setFoodType(FoodType.DRINK);
        food11.setPrice(330);
        foodDao.save(food11);

        Food food12 = new Food();
        food12.setName("Ásványvíz");
        food12.setFoodType(FoodType.DRINK);
        food12.setPrice(250);
        foodDao.save(food12);
    }

    public List<Food> getAllFoods() {
        return foodDao.findAll();
    }
}

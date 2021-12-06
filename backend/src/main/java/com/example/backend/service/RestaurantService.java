package com.example.backend.service;

import com.example.backend.dao.RestaurantDao;
import com.example.backend.model.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantDao restaurantDao;

    private Restaurant restaurant;

    public void initRestaurant() {
        this.restaurant = new Restaurant();
        restaurantDao.save(restaurant);
    }

    public void addToGrandTotal(int price) {
        int currPrice = restaurant.getGrandTotal();
        this.restaurant.setGrandTotal(currPrice + price);
        restaurantDao.save(this.restaurant);
    }

    public int getGrandTotal() {
        return this.restaurant.getGrandTotal();
    }

    public String getImagePath() {
        return this.restaurant.getImagePath();
    }
}

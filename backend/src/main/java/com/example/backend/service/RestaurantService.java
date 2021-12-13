package com.example.backend.service;

import com.example.backend.dao.RestaurantDao;
import com.example.backend.model.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantDao restaurantDao;

    public void initRestaurant() {

        Restaurant restaurant = new Restaurant();
        restaurantDao.save(restaurant);
    }

    public void addToGrandTotal(int price) {
        Restaurant restaurant = findRestaurant();
        int currPrice = restaurant.getGrandTotal();
        restaurant.setGrandTotal(currPrice + price);
        restaurantDao.save(restaurant);
    }

    public int getGrandTotal() {
        Restaurant restaurant = findRestaurant();
        return restaurant.getGrandTotal();
    }

    public String getImagePath() {
        Restaurant restaurant = findRestaurant();
        return restaurant.getImagePath();
    }

    public Restaurant findRestaurant() {
        return restaurantDao.getById("1");
    }
}

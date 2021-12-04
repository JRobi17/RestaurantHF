package com.example.backend.controller;

import com.example.backend.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@RestController
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @PostConstruct
    private void initRestaurant() {
        restaurantService.initRestaurant();
    }

    @GetMapping("/grandTotal")
    private int getGrandTotal() {
        return restaurantService.getGrandTotal();
    }

    @GetMapping("/restaurant")
    private String getImagePath() { return restaurantService.getImagePath(); }
}

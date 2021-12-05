package com.example.backend.controller;

import com.example.backend.model.OrderEntity;
import com.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostConstruct
    public void initOrder() {
        orderService.initOrder();
    }

    @GetMapping("/getAllOngoingOrders")
    public List<OrderEntity> getAllOngoingOrders() { return orderService.getAllOngoingOrders(); }

    @GetMapping("/getClosedOrders")
    public List<OrderEntity> getClosedOrders() { return orderService.getAllClosedOrders(); }

    @PutMapping("/orders/{id}/{rating}/{grandTotal}")
    public void updateOrderStatus(@PathVariable int id, @PathVariable int rating, @PathVariable int grandTotal) { orderService.modifyOrderStatus(id, rating, grandTotal); }

    @DeleteMapping("/orders/{id}")
    public void deleteOrder(@PathVariable int id) { orderService.deleteOrder(id); }

    @PostMapping("/addNewOrder")
    public void addNewOrder(@RequestBody OrderEntity order) { orderService.addNewOrder(order); }
}

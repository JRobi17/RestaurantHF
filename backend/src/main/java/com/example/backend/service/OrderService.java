package com.example.backend.service;

import com.example.backend.dao.OrderDao;
import com.example.backend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private RestaurantService restaurantService;

    private static final DecimalFormat df = new DecimalFormat("0.00");

    public void initOrder() {
        /*
        OrderEntity order1 = new OrderEntity();
        order1.setPaymentMethod(PaymentMethod.CARD);
        order1.setGrandTotal(10000);
        order1.setOrderType(OrderType.DELIVERY);
        orderDao.save(order1);
         */
    }

    public List<OrderEntity> getAllOngoingOrders() {
        List<OrderEntity> orders = orderDao.findAll();
        List<OrderEntity> onGoingOrders = new ArrayList<>();
        if (orders.size() != 0)
            for (OrderEntity o : orders)
                if (!o.isClosed())
                    onGoingOrders.add(o);
        return onGoingOrders;
    }

    public List<OrderEntity> getAllClosedOrders() {
        List<OrderEntity> orders = orderDao.findAll();
        List<OrderEntity> closedOrders = new ArrayList<>();
        if (orders.size() != 0)
            for (OrderEntity o : orders)
                if (o.isClosed())
                    closedOrders.add(o);
        return closedOrders;
    }

    public void modifyOrderStatus(int id, int rating, int grandTotal) {
        List<OrderEntity> orders = getAllOngoingOrders();
        for (OrderEntity o : orders)
            if (o.getOrderId() == id) {
                o.setClosed(true);
                o.setRating(rating);
                restaurantService.addToGrandTotal(grandTotal);
                orderDao.save(o);
            }
    }

    public void deleteOrder(int id) {
        List<OrderEntity> orders = getAllOngoingOrders();
        for (OrderEntity o : orders)
            if (o.getOrderId() == id)
                orderDao.delete(o);
    }

    public void addNewOrder(OrderEntity order) {
        OrderEntity newOrder = new OrderEntity();
        newOrder.setOrderType(order.getOrderType());
        newOrder.setRating(order.getRating());
        newOrder.setGrandTotal(order.getGrandTotal());
        newOrder.setPaymentMethod(order.getPaymentMethod());
        AddressEntity address = new AddressEntity();
        address.setCustomerName(order.getAddress().getCustomerName());
        address.setCity(order.getAddress().getCity());
        address.setZipCode(order.getAddress().getZipCode());
        address.setPhoneNumber(order.getAddress().getPhoneNumber());
        address.setStreet(order.getAddress().getStreet());
        newOrder.setAddress(address);
        orderDao.save(newOrder);
    }

    public String getAvgRating() {
        List<OrderEntity> orders = getAllClosedOrders();
        if (orders == null || orders.size() == 0) {
            return "-";
        }
        double counter = 0;
        double totalRatings = 0;
        for (OrderEntity o : orders) {
            counter++;
            totalRatings += o.getRating();
        }
        return String.valueOf(df.format(totalRatings / counter));
    }
}

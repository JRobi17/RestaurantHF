package com.example.backend.service;

import com.example.backend.dao.OrderDao;
import com.example.backend.model.OrderEntity;
import com.example.backend.model.OrderType;
import com.example.backend.model.PaymentMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private RestaurantService restaurantService;

    public void initOrder() {
        OrderEntity order1 = new OrderEntity();
        order1.setPaymentMethod(PaymentMethod.CARD);
        order1.setGrandTotal(10000);
        order1.setOrderType(OrderType.DELIVERY);
        orderDao.save(order1);
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
}

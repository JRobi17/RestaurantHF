package com.example.backend.dao;

import com.example.backend.model.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDao extends JpaRepository<OrderEntity, Integer> {
}

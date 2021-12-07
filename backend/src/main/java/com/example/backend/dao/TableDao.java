package com.example.backend.dao;

import com.example.backend.model.TableEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TableDao extends JpaRepository<TableEntity, String> {
}

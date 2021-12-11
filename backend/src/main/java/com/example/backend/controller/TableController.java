package com.example.backend.controller;

import com.example.backend.model.TableEntity;
import com.example.backend.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.List;

@RestController
public class TableController {

    @Autowired
    private TableService tableService;

    @PostConstruct
    public void initOrder() {
        tableService.initTable();
    }

    @GetMapping("/table/getAll")
    public List<TableEntity> getAllTables() { return tableService.getAllTables(); }

    @GetMapping("/table/getNumberOfAvailableTables")
    public String getNumberOfAvailableTables() { return tableService.getNumberOfAvailableTables(); }

    @GetMapping("/table/getCurrReservationForTable/{tableId}")
    public String getCurrReservationForTable(@PathVariable String tableId) { return tableService.getCurrReservationForTable(tableId); }
}

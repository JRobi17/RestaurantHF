package com.example.backend.service;

import com.example.backend.dao.TableDao;
import com.example.backend.model.TableEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TableService {

    @Autowired
    private TableDao tableDao;

    public void initTable() {

        TableEntity table1 = new TableEntity();
        table1.setCapacity(2);
        tableDao.save(table1);

        TableEntity table2 = new TableEntity();
        table2.setCapacity(4);
        tableDao.save(table2);

        TableEntity table3 = new TableEntity();
        table3.setCapacity(4);
        tableDao.save(table3);

        TableEntity table4 = new TableEntity();
        table4.setCapacity(2);
        tableDao.save(table4);

        TableEntity table5 = new TableEntity();
        table5.setCapacity(8);
        tableDao.save(table5);

        TableEntity table6 = new TableEntity();
        table6.setCapacity(4);
        tableDao.save(table6);

        TableEntity table7 = new TableEntity();
        table7.setCapacity(2);
        tableDao.save(table7);

        TableEntity table8 = new TableEntity();
        table8.setCapacity(8);
        tableDao.save(table8);

    }

    public List<TableEntity> getAllTables() {
        return tableDao.findAll();
    }

    public String getNumberOfAvailableTables() {
        List<TableEntity> tables = getAllTables();
        int counter = 0;
        for (TableEntity t : tables)
            if (t.getStatus().equals("Szabad"))
                counter++;
        return String.valueOf(counter);
    }
}

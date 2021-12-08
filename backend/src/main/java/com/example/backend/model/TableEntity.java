package com.example.backend.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class TableEntity {

    @Id
    @GeneratedValue
    private int tableId;
    private int capacity;
    private boolean isTaken = false;
    @OneToMany(mappedBy = "tableId", cascade = CascadeType.MERGE)
    private List<Reservation> reservationList;

    public int getTableId() {
        return tableId;
    }

    public void setTableId(int tableId) {
        this.tableId = tableId;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public boolean isTaken() {
        return isTaken;
    }

    public void setTaken(boolean taken) {
        isTaken = taken;
    }

    public List<Reservation> getReservationList() {
        return reservationList;
    }

    public void setReservationList(List<Reservation> reservationList) {
        this.reservationList = reservationList;
    }
}

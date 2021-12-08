package com.example.backend.model;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Reservation {

    @Id
    @GeneratedValue
    private int reservationId;
    private LocalDateTime reservationStart;
    private LocalDateTime reservationEnd;
    @OneToOne(cascade = CascadeType.ALL)
    private AddressEntity guest;
    private int amountOfGuests;
    private int tableId;
    private boolean isOver = false;

    public int getReservationId() {
        return reservationId;
    }

    public void setReservationId(int reservationId) {
        this.reservationId = reservationId;
    }

    public LocalDateTime getReservationStart() {
        return reservationStart;
    }

    public void setReservationStart(LocalDateTime reservationStart) {
        this.reservationStart = reservationStart;
    }

    public LocalDateTime getReservationEnd() {
        return reservationEnd;
    }

    public void setReservationEnd(LocalDateTime reservationEnd) {
        this.reservationEnd = reservationEnd;
    }

    public AddressEntity getGuest() {
        return guest;
    }

    public void setGuest(AddressEntity guest) {
        this.guest = guest;
    }

    public int getAmountOfGuests() {
        return amountOfGuests;
    }

    public void setAmountOfGuests(int amountOfGuests) {
        this.amountOfGuests = amountOfGuests;
    }

    public int getTableId() {
        return tableId;
    }

    public void setTableId(int tableId) {
        this.tableId = tableId;
    }

    public boolean isOver() {
        return isOver;
    }

    public void setOver(boolean over) {
        isOver = over;
    }
}

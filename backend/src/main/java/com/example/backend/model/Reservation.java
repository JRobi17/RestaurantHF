package com.example.backend.model;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    @ManyToOne(cascade = CascadeType.ALL)
    private TableEntity table;
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

    public TableEntity getTable() {
        return table;
    }

    public void setTable(TableEntity table) {
        this.table = table;
    }

    public boolean isOver() {
        return isOver;
    }

    public void setOver(boolean over) {
        isOver = over;
    }
}

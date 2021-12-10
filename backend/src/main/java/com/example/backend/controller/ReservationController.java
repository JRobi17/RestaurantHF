package com.example.backend.controller;

import com.example.backend.model.Reservation;
import com.example.backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.Date;
import java.util.List;

@RestController
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/reservation/makeAReservation")
    public void makeAReservation(@RequestBody Reservation reservation) {
        this.reservationService.makeAReservation(reservation);
    }

    @PutMapping("/reservation/closeReservation/{id}")
    public void closeReservation(@PathVariable int id) { this.reservationService.closeReservation(id); }

    @GetMapping("/reservation/getOpenReservations")
    public List<Reservation> getOpenReservations() { return this.reservationService.getOpenReservations(); }

    @GetMapping("/reservation/getClosedReservations")
    public List<Reservation> getClosedReservations() { return this.reservationService.getClosedReservations(); }

    @GetMapping("/reservation/{tableId}")
    public List<Reservation> getReservationForTable(@PathVariable int tableId) { return this.reservationService.getReservationsForTable(tableId); }
}

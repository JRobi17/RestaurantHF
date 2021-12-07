package com.example.backend.controller;

import com.example.backend.model.Reservation;
import com.example.backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/reservation/makeAReservation")
    public void makeAReservation(Reservation reservation) {
        this.reservationService.makeAReservation(reservation);
    }
}

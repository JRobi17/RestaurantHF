package com.example.backend.service;

import com.example.backend.dao.ReservationDao;
import com.example.backend.model.AddressEntity;
import com.example.backend.model.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    @Autowired
    private ReservationDao reservationDao;

    public void makeAReservation(Reservation reservation) {
        Reservation newReservation = new Reservation();
        newReservation.setReservationStart(reservation.getReservationStart());
        newReservation.setReservationStart(reservation.getReservationStart());
        newReservation.setReservationEnd(reservation.getReservationStart().plusHours(1));
        newReservation.setAmountOfGuests(reservation.getAmountOfGuests());
        newReservation.setTable(reservation.getTable());
        AddressEntity address = new AddressEntity();
        address.setCustomerName(reservation.getGuest().getCustomerName());
        address.setCity(reservation.getGuest().getCity());
        address.setZipCode(reservation.getGuest().getZipCode());
        address.setPhoneNumber(reservation.getGuest().getPhoneNumber());
        address.setStreet(reservation.getGuest().getStreet());
        newReservation.setGuest(address);
        reservationDao.save(newReservation);
    }
}

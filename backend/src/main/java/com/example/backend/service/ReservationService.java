package com.example.backend.service;

import com.example.backend.dao.ReservationDao;
import com.example.backend.dao.TableDao;
import com.example.backend.model.AddressEntity;
import com.example.backend.model.Reservation;
import com.example.backend.model.TableEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationDao reservationDao;

    @Autowired
    private TableDao tableDao;

    public void makeAReservation(Reservation reservation) {

        Reservation newReservation = new Reservation();
        newReservation.setReservationStart(reservation.getReservationStart());
        newReservation.setReservationEnd(reservation.getReservationStart().plusHours(1));
        newReservation.setAmountOfGuests(reservation.getAmountOfGuests());

        List<TableEntity> tables = tableDao.findAll();
        for (TableEntity t : tables) {
            if (t.getTableId() == reservation.getTableId()) {
                t.setStatus("Foglalt");
                t.getReservationList().add(reservation);
                newReservation.setTableId(reservation.getTableId());
            }
        }

        AddressEntity address = new AddressEntity();
        address.setCustomerName(reservation.getGuest().getCustomerName());
        address.setCity(reservation.getGuest().getCity());
        address.setZipCode(reservation.getGuest().getZipCode());
        address.setPhoneNumber(reservation.getGuest().getPhoneNumber());
        address.setStreet(reservation.getGuest().getStreet());
        newReservation.setGuest(address);

        reservationDao.save(newReservation);
    }

    public List<Reservation> getAllReservations() {
        return this.reservationDao.findAll();
    }

    public List<Reservation> getReservationsForTable(int tableId) {
        List<TableEntity> tableEntityList = this.tableDao.findAll();
        TableEntity searchedTable = null;
        for (TableEntity t : tableEntityList) {
            if (t.getTableId() == tableId) {
                searchedTable = t;
            }
        }
        List<Reservation> reservationList = getAllReservations();
        List<Reservation> tableReservations = new ArrayList<>();
        if (reservationList != null && reservationList.size() != 0 && searchedTable != null) {
            for (Reservation r : reservationList) {
                if (r.getTableId() == searchedTable.getTableId()) {
                    tableReservations.add(r);
                }
            }
        }
        return tableReservations;
    }

    public List<Reservation> getOpenReservations() {
        List<Reservation> allReservations = getAllReservations();
        List<Reservation> openReservations = new ArrayList<>();
        for (Reservation r : allReservations) {
            if (r.getStatus().equals("Folyamatban")) {
                openReservations.add(r);
            }
        }
        return openReservations;
    }

    public List<Reservation> getClosedReservations() {
        List<Reservation> allReservations = getAllReservations();
        List<Reservation> closedReservations = new ArrayList<>();
        for (Reservation r : allReservations) {
            if (r.getStatus().equals("Lezárt")) {
                closedReservations.add(r);
            }
        }
        return closedReservations;
    }

    public void closeReservation(int id) {
        List<Reservation> allReservations = getAllReservations();
        for (Reservation r : allReservations) {
            if (r.getReservationId() == id) {
                List<TableEntity> tables = tableDao.findAll();
                for (TableEntity t : tables) {
                    if (t.getTableId() == r.getTableId()) {
                        t.setStatus("Szabad");
                        t.getReservationList().remove(r);
                    }
                }
                r.setStatus("Lezárt");
                reservationDao.save(r);
            }
        }
    }
}
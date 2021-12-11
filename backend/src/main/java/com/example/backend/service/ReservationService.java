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
        newReservation.setIsCurrent(reservation.getIsCurrent());

        List<TableEntity> tables = tableDao.findAll();
        for (TableEntity t : tables) {
            if (t.getTableId() == reservation.getTableId()) {
                if (reservation.getIsCurrent().equals("Current")) {
                    newReservation.setReservationStart(newReservation.getReservationStart().plusHours(1));
                    newReservation.setReservationEnd(newReservation.getReservationEnd().plusHours(1));
                    t.setStatus("Foglalt");
                }
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

    public List<Reservation> getReservationsForTable(String tableId) {
        List<Reservation> reservationList = getAllReservations();
        List<Reservation> tableReservations = new ArrayList<>();
        if (reservationList != null && reservationList.size() != 0) {
            for (Reservation r : reservationList) {
                if (r.getTableId() == Integer.parseInt(tableId)) {
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
                        if (r.getIsCurrent().equals("Current")) {
                            t.setStatus("Szabad");
                        }
                        t.getReservationList().remove(r);

                    }
                }
                r.setIsCurrent(r.getStatus());
                r.setStatus("Lezárt");
                reservationDao.save(r);
            }
        }
    }

    public void theyArrived(int id) {
        List<Reservation> allReservations = getAllReservations();
        for (Reservation r : allReservations) {
            if (r.getReservationId() == id) {
                List<TableEntity> tables = tableDao.findAll();
                for (TableEntity t : tables) {
                    if (t.getTableId() == r.getTableId()) {
                        t.setStatus("Foglalt");
                        r.setIsCurrent("Current");
                        reservationDao.save(r);
                    }
                }
            }
        }

    }

    public boolean checkIfResIsValid(Reservation reservation) {
        List<Reservation> reservationListForTable = getReservationsForTable(String.valueOf(reservation.getTableId()));
        if (reservationListForTable.isEmpty()) {
            return true;
        }
        List<Reservation> openReservationListForTable = new ArrayList<>();
        for (Reservation r : reservationListForTable) {
            if (r.getIsCurrent().equals("Current")) {
                openReservationListForTable.add(r);
            }
        }
        for (Reservation r : openReservationListForTable) {
            if (r.getTableId() == reservation.getTableId()) {
                if (reservation.getReservationStart().isAfter(r.getReservationStart()) && reservation.getReservationStart().isBefore(r.getReservationEnd())) {
                    return false;
                }
                if (reservation.getReservationStart().plusHours(1).isAfter(r.getReservationStart()) && reservation.getReservationStart().plusHours(1).isBefore(r.getReservationEnd())) {
                    return false;
                }
            }
        }
        return true;
    }

    public boolean checkIfCapacityIsRight(String tableId, String amountOfGuests) {
        List<TableEntity> tableEntityList = tableDao.findAll();
        for (TableEntity t : tableEntityList) {
            if (t.getTableId() == Integer.parseInt(tableId)) {
                if (t.getCapacity() < Integer.parseInt(amountOfGuests)) {
                    return false;
                }
            }
        }
        return true;
    }
}
import {Component, OnInit} from '@angular/core';
import {ReservationService} from "../services/reservation.service";
import {Reservation} from "../classes/reservation";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  openReservationList!: Reservation[]
  closedReservationList!: Reservation[]
  reservation: Reservation = new Reservation()
  reservationView!: boolean;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getOpenReservations().subscribe(data =>
      this.openReservationList = data)
    this.reservationService.getClosedReservations().subscribe(data =>
      this.closedReservationList = data)
  }

  formatDate(date: Date): string | null {
    const datePipe: DatePipe = new DatePipe('en-US')
    return datePipe.transform(date, 'YYYY-MMM-dd | HH:mm:ss')
  }

  pageSwap() {
    this.reservationView = !this.reservationView
  }
}

import {Component, OnInit} from '@angular/core';
import {ReservationService} from "../services/reservation.service";
import {Reservation} from "../classes/reservation";
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {ReservationView} from "../classes/reservationView";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  openReservationList!: Reservation[]
  closedReservationList!: Reservation[]
  reservationHistory!: Reservation[]

  reservationView!: ReservationView
  reservationViewTypes: typeof ReservationView = ReservationView

  constructor(private reservationService: ReservationService, private route: ActivatedRoute) {
    this.reservationView = this.reservationViewTypes.OpenReservations
  }

  ngOnInit(): void {
    if (this.route.snapshot.params['id'] != null) {
      this.getReservationsForTable(this.route.snapshot.params['id'])
      this.reservationView = this.reservationViewTypes.ReservationHistory
    } else {
      this.getReservations()
    }
  }

  private getReservations() {
    this.reservationService.getOpenReservations().subscribe(data =>
      this.openReservationList = data)
    this.reservationService.getClosedReservations().subscribe(data =>
      this.closedReservationList = data)
  }

  private getReservationsForTable(id: string) {
    this.reservationService.getReservationsForTable(id).subscribe( data =>
      this.reservationHistory = data)
  }

  formatDate(date: Date): string | null {
    const datePipe: DatePipe = new DatePipe('en-US')
    return datePipe.transform(date, 'YYYY-MMM-dd | HH:mm:ss')
  }

  pageSwap() {
    if (this.reservationView === this.reservationViewTypes.OpenReservations) {
      this.reservationView = this.reservationViewTypes.ClosedReservations
    } else if(this.reservationView === this.reservationViewTypes.ClosedReservations) {
      this.reservationView = this.reservationViewTypes.OpenReservations
    }
  }

  closeReservation(reservationId: number) {
    this.reservationService.closeReservation(reservationId).subscribe( () => {
      this.getReservations();
    })
  }

  theyArrived(reservationId: number) {
    this.reservationService.theyArrived(reservationId).subscribe( () => {
      this.getReservations();
    })
  }
}

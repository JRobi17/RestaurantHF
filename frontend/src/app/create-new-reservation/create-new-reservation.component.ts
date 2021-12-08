import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../services/reservation.service";
import {Router} from "@angular/router";
import {Reservation} from "../classes/reservation";
import {TableService} from "../services/table.service";
import {Table} from "../classes/table";
import {Address} from "../classes/address";

@Component({
  selector: 'app-create-new-reservation',
  templateUrl: './create-new-reservation.component.html',
  styleUrls: ['./create-new-reservation.component.css']
})
export class CreateNewReservationComponent implements OnInit {

  reservation: Reservation = new Reservation()
  tables!: Table[]
  selectedTable!: number

  error: string = ""
  guestView: boolean = false

  constructor(private reservationService: ReservationService, private tableService: TableService, private router: Router) {
    this.reservation.guest = new Address()
  }

  ngOnInit(): void {
    this.tableService.getAllTables().subscribe(data => {
      this.tables = data;
    })
  }

  onSubmit() {
    this.reservation.tableId = this.selectedTable
    if (!this.reservation.guest.customerName || !this.reservation.guest.street || !this.reservation.guest.zipCode || !this.reservation.guest.phoneNumber || !this.reservation.guest.city) {
      this.error = "Minden adat kitöltése kötelező!"
    } else {
      this.reservationService.makeAReservation(this.reservation).subscribe(() =>
        this.router.navigate(['/reservation'])
      )
    }
  }

  pageSwap() {
    this.guestView = !this.guestView
  }

}

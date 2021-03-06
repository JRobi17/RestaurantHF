import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../services/reservation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TableService} from "../services/table.service";
import {DatePipe} from "@angular/common";
import {Reservation} from "../classes/reservation";
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
  tableChosen: boolean = false
  buttonClicked: boolean = false
  error: string = ""
  guestView: boolean = false
  formattedDate!: string | null
  isResValid!: boolean

  constructor(private reservationService: ReservationService, private tableService: TableService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( () =>
      this.selectedTable
      )

  }

  ngOnInit(): void {
    if (this.route.snapshot.params['id'] != null) {
      this.tableChosen = true;
      this.selectedTable = this.route.snapshot.params['id']
    }
    this.tableService.getAllTables().subscribe(data => {
      this.tables = data;
    })
    this.reservation.guest = new Address()
  }

  onSubmit() {

    if (this.buttonClicked) {
      this.reservation.isCurrent = "Current"
    }
    if (!this.reservation.guest.customerName || !this.reservation.guest.street || !this.reservation.guest.zipCode || !this.reservation.guest.phoneNumber || !this.reservation.guest.city) {
      this.error = "Minden adat kitöltése kötelező!"
    } else {
      this.reservationService.checkIfCapacityIsRight(this.reservation.tableId, this.reservation.amountOfGuests).subscribe(data => {
        if (!data) {
          this.error = "Ennyi vendéget ez az asztal nem tud fogadni."
        } else {
          this.reservationService.checkIfResIsValid(this.reservation).subscribe(data => {
            if (data) {
              this.reservationService.makeAReservation(this.reservation).subscribe(() =>
                this.router.navigate(['/reservation'])
              )
            } else {
              this.buttonClicked = false;
              this.error = "Ebben az időpontban ez az asztal már foglalt."
            }
          })
        }
      })
    }
  }

  pageSwap() {
    this.reservation.tableId = this.selectedTable
    if (!this.reservation.reservationStart || !this.reservation.tableId || !this.reservation.amountOfGuests) {
      this.error = "Minden adat kitöltése kötelező!"
    } else {
      this.error = ""
      this.guestView = !this.guestView
    }

  }

  currentTime(): Date {
    this.buttonClicked = true
    this.formattedDate = this.formatDate(new Date())
    return new Date()
  }

  formatDate(date: Date): string | null {
    const datePipe: DatePipe = new DatePipe('hu-HUN')
    return datePipe.transform(date, 'YYYY-MMM-dd | HH:mm:ss')
  }

}

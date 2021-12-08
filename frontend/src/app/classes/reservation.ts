import {Address} from "./address";
import {Table} from "./table";
import {Time} from "@angular/common";

export class Reservation {
  reservationStart!: Date
  reservationEnd!: Date
  isOver!: boolean
  time!: Time
  guest!: Address
  amountOfGuests!: number
  tableId!: number
}

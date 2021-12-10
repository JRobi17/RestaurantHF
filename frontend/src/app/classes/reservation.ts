import {Address} from "./address";
import {Table} from "./table";
import {Time} from "@angular/common";

export class Reservation {
  reservationId!: number
  reservationStart!: Date
  reservationEnd!: Date
  status!: string
  time!: Time
  guest!: Address
  amountOfGuests!: number
  tableId!: number
}

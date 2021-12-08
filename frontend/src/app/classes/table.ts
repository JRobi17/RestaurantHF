import {Reservation} from "./reservation";

export class Table {
  tableId!: number
  capacity!: number
  isTaken: boolean = false
  reservationList!: Reservation[]
}


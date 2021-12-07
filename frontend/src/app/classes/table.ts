import {Reservation} from "./reservation";

export class Table {
  id!: number
  capacity!: number
  isTaken: boolean = false
  reservationList!: Reservation[]
}


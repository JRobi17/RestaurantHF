import {Reservation} from "./reservation";

export class Table {
  tableId!: number
  capacity!: number
  status!: string
  reservationList!: Reservation[]
}


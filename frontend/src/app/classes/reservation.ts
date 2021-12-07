import {Address} from "./address";
import {Table} from "./table";

export class Reservation {
  reservationStart!: Date
  reservationEnd!: Date
  guest!: Address
  amountOfGuests!: number
  table!: Table
}

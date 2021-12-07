import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Reservation} from "../classes/reservation";

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  PATH_OF_API = 'http://localhost:9090';
  requestHeader = new HttpHeaders({'No-Auth': 'True'});

  constructor(
    private httpclient: HttpClient,
  ) {
  }

  public makeAReservation(reservation: Reservation) {
    return this.httpclient.post(this.PATH_OF_API + "/reservation/makeAReservation", reservation, {responseType: 'text'})
  }
}

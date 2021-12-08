import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Reservation} from "../classes/reservation";
import {Observable} from "rxjs";

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

  public getOpenReservations() : Observable<Reservation[]> {
    return this.httpclient.get<Reservation[]>(this.PATH_OF_API + "/reservation/getOpenReservations")
  }

  public getClosedReservations() : Observable<Reservation[]> {
    return this.httpclient.get<Reservation[]>(this.PATH_OF_API + "/reservation/getClosedReservations")
  }

  public getReservationForTable(tableId: number): Observable<Reservation[]> {
    return this.httpclient.get<Reservation[]>(this.PATH_OF_API + "/reservation/" + tableId)
  }
}

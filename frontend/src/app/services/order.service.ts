import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderEntity} from "../classes/orderentity";
import {Address} from "../classes/address";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  PATH_OF_API = 'http://localhost:9090';
  requestHeader = new HttpHeaders({'No-Auth': 'True'});

  constructor(
    private httpclient: HttpClient,
  ) {
  }

  public getAllOngoingOrders(): Observable<OrderEntity[]>  {
    return this.httpclient.get<OrderEntity[]>(this.PATH_OF_API + '/getAllOngoingOrders')
  }

  public getClosedOrders(): Observable<OrderEntity[]> {
    return this.httpclient.get<OrderEntity[]>(this.PATH_OF_API + '/getClosedOrders')
  }

  public deleteOrder(id: number) {
    return this.httpclient.delete(this.PATH_OF_API + '/orders/' + id, {responseType: 'text'})
  }

  public finishOrder(id: number, rating: number, grandTotal: number) {
    return this.httpclient.put(this.PATH_OF_API + '/orders/' + id + '/' + rating + '/' + grandTotal,  {responseType: 'text'})
  }

  public addNewOrder(order: OrderEntity) {
    return this.httpclient.post(this.PATH_OF_API + "/addNewOrder", order, {responseType: 'text'})
  }

  getCurrAddress(reservationId: string | null): Observable<Address> {
    return this.httpclient.get<Address>(this.PATH_OF_API + "/orders/getCurrAddress/" + reservationId)
  }

  getCurrTableId(reservationId: string | null) {
    return this.httpclient.get(this.PATH_OF_API + "/orders/getCurrTableId/" + reservationId, {responseType: 'text'})
  }
}

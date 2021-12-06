import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  PATH_OF_API = 'http://localhost:9090';
  requestHeader = new HttpHeaders({'No-Auth': 'True'});

  constructor(
    private httpclient: HttpClient,
  ) {
  }

  public getGrandTotal() {
    return this.httpclient.get(this.PATH_OF_API + '/grandTotal', {responseType: 'text'})
  }

  public finishOrder(id: number, rating: number, grandTotal: number) {
    return this.httpclient.put(this.PATH_OF_API + '/orders/' + id + '/' + rating + '/' + grandTotal,  {responseType: 'text'})
  }

  public getRestaurant() {
    return this.httpclient.get(this.PATH_OF_API + "/restaurant", {responseType: 'text'})
  }

  public getAvgRating() {
    return this.httpclient.get(this.PATH_OF_API + "/getAvgRating", {responseType: 'text'})
  }
}

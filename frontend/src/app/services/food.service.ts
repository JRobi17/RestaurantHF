import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Food} from "../classes/food";

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  PATH_OF_API = 'http://localhost:9090';
  requestHeader = new HttpHeaders({'No-Auth': 'True'});

  constructor(
    private httpclient: HttpClient,
  ) {
  }

  public getAllFoods(): Observable<Food[]>  {
    return this.httpclient.get<Food[]>(this.PATH_OF_API + '/getAllFoods')
  }

}

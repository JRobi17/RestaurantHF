import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Table} from "../classes/table";

@Injectable({
  providedIn: 'root',
})
export class TableService {
  PATH_OF_API = 'http://localhost:9090';
  requestHeader = new HttpHeaders({'No-Auth': 'True'});

  constructor(
    private httpclient: HttpClient,
  ) {
  }

  getAllTables(): Observable<Table[]> {
    return this.httpclient.get<Table[]>(this.PATH_OF_API + '/table/getAll')
  }

  getCurrReservationForTable(id: number) {
    return this.httpclient.get(this.PATH_OF_API + '/table/getCurrReservationForTable/' + id, {responseType: "text"})
  }
}

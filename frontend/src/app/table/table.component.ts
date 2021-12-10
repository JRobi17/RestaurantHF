import {Component, OnInit} from '@angular/core';
import {TableService} from "../services/table.service";
import {Table} from "../classes/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  tables!: Table[]
  numberOfFreeTables!: string

  constructor(private tableService: TableService, private router: Router) { }

  ngOnInit(): void {
    this.tableService.getAllTables().subscribe(data =>
      this.tables = data);
    this.tableService.getNumberOfAvailableTables().subscribe(data =>
      this.numberOfFreeTables = data);

  }

  routeToTableReservations(id: number) {
    this.router.navigate(["/createnewreservation/" + id]);
  }
}

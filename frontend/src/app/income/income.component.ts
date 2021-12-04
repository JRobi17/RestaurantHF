import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../services/restaurant.service";

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  grandTotal!: string

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getGrandTotal().subscribe( data =>
      this.grandTotal = data)
  }

}

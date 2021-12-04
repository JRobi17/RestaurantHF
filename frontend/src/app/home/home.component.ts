import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../services/restaurant.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  today: string
  restaurantPicPath!: string

  constructor(private restaurantService: RestaurantService) {
    this.today = new Date().toISOString().slice(0, 10)
  }

  ngOnInit(): void {
    this.restaurantService.getRestaurant().subscribe(data =>
     this.restaurantPicPath = data)
  }
}

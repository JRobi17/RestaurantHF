import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../services/restaurant.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  today: string
  restaurantPicPath!: string
  grandTotal!: string
  rateAvg!: string

  constructor(private restaurantService: RestaurantService, public userService: UserService) {
    this.today = new Date().toISOString().slice(0, 10)
  }

  ngOnInit(): void {
    this.restaurantService.getRestaurant().subscribe(data =>
     this.restaurantPicPath = data)
    this.restaurantService.getGrandTotal().subscribe(data =>
      this.grandTotal = data)
    this.restaurantService.getAvgRating().subscribe(data =>
      this.rateAvg = data)
  }
}

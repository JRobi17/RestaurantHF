import {Component, OnInit} from '@angular/core';
import {OrderService} from "../services/order.service";
import {OrderEntity} from "../classes/orderentity";
import {FoodService} from "../services/food.service";
import {Food} from "../classes/food";
import {FoodType} from "../classes/foodType";
import {PaymentMethod} from "../classes/paymentMethod";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  order: OrderEntity = new OrderEntity()
  foods!: Food[]
  food: Food = new Food()

  selectedFoods: Food[] = []
  selectedAppetizer!: Food
  selectedMainCourse!: Food
  selectedDessert!: Food
  selectedDrink!: Food
  selectedPaymentMethod!: PaymentMethod

  allFoodTypes: typeof FoodType = FoodType
  allPaymentMethod: typeof PaymentMethod = PaymentMethod;

  constructor(private orderService: OrderService, private foodService: FoodService, private router: Router) {
    this.order.orderType = 1
    this.order.rating = 0;
    this.order.foodList = this.selectedFoods
  }

  ngOnInit(): void {
    this.foodService.getAllFoods().subscribe(data =>
      this.foods = data)
  }

  onSubmit() {
    this.order.foodList.push(this.selectedAppetizer, this.selectedMainCourse, this.selectedDessert, this.selectedDrink)
    this.order.grandTotal = this.selectedAppetizer.price + this.selectedMainCourse.price + this.selectedDessert.price + this.selectedDrink.price
    this.order.paymentMethod = this.selectedPaymentMethod
    this.orderService.addNewOrder(this.order).subscribe( () =>
      this.router.navigate(['/order']))
  }

}

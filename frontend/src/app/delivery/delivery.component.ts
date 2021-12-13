import {Component, OnInit} from '@angular/core';
import {OrderService} from "../services/order.service";
import {OrderEntity} from "../classes/orderentity";
import {FoodService} from "../services/food.service";
import {Food} from "../classes/food";
import {FoodType} from "../classes/foodType";
import {PaymentMethod} from "../classes/paymentMethod";
import {Router} from "@angular/router";
import {Address} from "../classes/address";
import {OrderType} from "../classes/orderType";

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
  none: Food = new Food()

  allFoodTypes: typeof FoodType = FoodType
  allPaymentMethod: typeof PaymentMethod = PaymentMethod;

  price: number = 0
  addressView: boolean = false

  error: string = ""

  constructor(private orderService: OrderService, private foodService: FoodService, private router: Router) {
    this.order.orderType = OrderType.Delivery
    this.order.rating = 0;
    this.order.address = new Address()
    this.order.foodList = this.selectedFoods
  }

  ngOnInit(): void {
    this.foodService.getAllFoods().subscribe(data =>
      this.foods = data)
  }

  addToMenu(food: Food, food2: Food, food3: Food, food4: Food) {
    if (food) {
      this.selectedFoods.push(food)
      this.price += food.price
    }
    if (food2) {
      this.selectedFoods.push(food2)
      this.price += food2.price
    }
    if (food3) {
      this.selectedFoods.push(food3)
      this.price += food3.price
    }
    if (food4) {
      this.selectedFoods.push(food4)
      this.price += food4.price
    }

  }

  deleteFromMenu(food: Food) {
    this.selectedFoods.forEach((item, index) => {
      if (item === food)
        this.selectedFoods.splice(index, 1)
    })
    this.price -= food.price
    if (this.price < 0) {
      this.price = 0;
    }
  }

  pageSwap() {
    if (this.order.foodList.length == 0) {
      this.error = "Legalább egy tételt hozzá kell adni a kosárhoz."
    } else {
      this.error = ""
      this.addressView = !this.addressView
    }
  }

  onSubmit() {
    this.order.foodList = this.selectedFoods
    this.order.grandTotal = this.price
    this.order.paymentMethod = this.selectedPaymentMethod
    if (!this.order.address.customerName || !this.order.address.street || !this.order.address.zipCode || !this.order.address.phoneNumber || !this.order.address.city || !this.order.paymentMethod) {
      this.error = "Minden adat kitöltése kötelező!"
    } else {
      this.orderService.addNewOrder(this.order).subscribe(() =>
        this.router.navigate(['/order'])
      )
    }
  }
}

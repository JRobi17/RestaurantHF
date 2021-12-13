import {Component, OnInit} from '@angular/core';
import {OrderEntity} from "../classes/orderentity";
import {Food} from "../classes/food";
import {PaymentMethod} from "../classes/paymentMethod";
import {FoodType} from "../classes/foodType";
import {OrderService} from "../services/order.service";
import {FoodService} from "../services/food.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../classes/address";
import {OrderType} from "../classes/orderType";

@Component({
  selector: 'app-add-new-order',
  templateUrl: './add-new-order.component.html',
  styleUrls: ['./add-new-order.component.css']
})
export class AddNewOrderComponent implements OnInit {

  order: OrderEntity = new OrderEntity()
  foods!: Food[]

  selectedFoods: Food[] = []
  selectedAppetizer!: Food
  selectedMainCourse!: Food
  selectedDessert!: Food
  selectedDrink!: Food
  selectedPaymentMethod!: PaymentMethod

  allFoodTypes: typeof FoodType = FoodType
  allPaymentMethod: typeof PaymentMethod = PaymentMethod;

  price: number = 0
  error: string = ""

  currId!: string

  constructor(private orderService: OrderService, private foodService: FoodService, private router: Router, private route: ActivatedRoute) {
    this.order.orderType = OrderType.Inplace
    this.order.rating = 0;
    this.order.address = new Address()
    this.order.foodList = this.selectedFoods
  }

  ngOnInit(): void {
    this.foodService.getAllFoods().subscribe(data =>
      this.foods = data)
    this.orderService.getCurrAddress(this.route.snapshot.paramMap.get('id')).subscribe(data =>
      this.order.address = data)
    this.orderService.getCurrTableId(this.route.snapshot.paramMap.get('id')).subscribe(data =>
      this.currId = data)
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

  onSubmit() {
    this.order.paymentMethod = this.selectedPaymentMethod
    if (this.order.foodList.length == 0) {
      this.error = "Legalább egy tételt hozzá kell adni a kosárhoz."
    } else if (!this.order.paymentMethod) {
      this.error = "Válasszon fizetési módot!"
    } else {
      this.order.foodList = this.selectedFoods
      this.order.grandTotal = this.price
      this.order.tableId = this.currId
      this.orderService.addNewOrder(this.order).subscribe(() => {
        this.router.navigate(['/order'])
      })
    }

  }
}

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
  food: Food = new Food()

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
    this.orderService.getCurrTableId(this.route.snapshot.paramMap.get('id')).subscribe( data =>
       this.currId = data)
  }

  addToMenu(food: Food) {
    this.selectedFoods.push(food)
    this.price += food.price
  }

  deleteFromMenu(food: Food) {
    this.selectedFoods.forEach((item, index) => {
      if (item === food)
        this.selectedFoods.splice(index, 1)
    })
    this.price -= food.price
  }

  onSubmit() {
    this.order.foodList = this.selectedFoods
    this.order.grandTotal = this.price
    this.order.paymentMethod = this.selectedPaymentMethod
    this.order.tableId = this.currId
    this.orderService.addNewOrder(this.order).subscribe(() => {
      this.router.navigate(['/order'])
    })
  }
}

import { Component, OnInit } from '@angular/core';
import {OrderService} from "../services/order.service";
import {OrderEntity} from "../classes/orderentity";

@Component({
  selector: 'app-closed-orders',
  templateUrl: './closed-orders.component.html',
  styleUrls: ['./closed-orders.component.css']
})
export class ClosedOrdersComponent implements OnInit {

  orders!: OrderEntity[]

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  private getOrders() {
    this.orderService.getClosedOrders().subscribe(data => {
      this.orders = data;
    })
  }
}

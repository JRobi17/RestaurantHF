import {Component, OnInit, TemplateRef} from '@angular/core';
import {OrderEntity} from "../classes/orderentity";
import {OrderService} from "../services/order.service";
import {Router} from "@angular/router";
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders!: OrderEntity[]
  closedOrders!: OrderEntity[]
  order: OrderEntity = new OrderEntity()
  modalRef!: BsModalRef;
  public form: FormGroup;
  rating!: number;
  orderView!: boolean;

  constructor(private orderService: OrderService, private router: Router, private modalService: BsModalService, private fb: FormBuilder) {
    this.rating = 0;
    this.form = this.fb.group({
    })
  }

  ngOnInit(): void {
    this.getOrders()
  }

  private getOrders() {
    this.orderService.getAllOngoingOrders().subscribe(data => {
      this.orders = data;
    })
    this.orderService.getClosedOrders().subscribe(data => {
      this.closedOrders = data;
    })
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.getOrders();
    })
  }

  finishOrder(id: number, rating: number, grandTotal: number) {
    this.orderService.finishOrder(id, rating, grandTotal).subscribe( () => {
      this.modalRef.hide();
      this.getOrders();
    })

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  decline(): void {
    this.modalRef.hide();
  }

  pageSwap() {
    this.orderView = !this.orderView
  }

}

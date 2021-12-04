import {PaymentMethod} from "./paymentMethod";
import {OrderType} from "./orderType";

export class OrderEntity {
  orderId!: number
  paymentMethod!: PaymentMethod
  grandTotal!: number
  orderType!: OrderType
  isClosed!: boolean
  rating!: number
}

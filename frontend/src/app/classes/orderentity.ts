import {PaymentMethod} from "./paymentMethod";
import {OrderType} from "./orderType";
import {Food} from "./food";

export class OrderEntity {
  orderId!: number
  paymentMethod!: PaymentMethod
  grandTotal!: number
  orderType!: OrderType
  isClosed!: boolean
  rating!: number
  foodList!: Food[]
}

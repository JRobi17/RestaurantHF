import {PaymentMethod} from "./paymentMethod";
import {OrderType} from "./orderType";
import {Food} from "./food";
import {Address} from "./address";

export class OrderEntity {
  orderId!: number
  paymentMethod!: PaymentMethod
  grandTotal!: number
  orderType!: OrderType
  isClosed!: boolean
  rating!: number
  foodList!: Food[]
  address!: Address
}

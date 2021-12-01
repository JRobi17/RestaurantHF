import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { TableComponent} from "./table/table.component";
import { OrderComponent} from "./order/order.component";
import { ReservationComponent} from "./reservation/reservation.component";
import { IncomeComponent} from "./income/income.component";
import { EmployeeComponent} from "./employee/employee.component";
import {AuthGuard} from "./auth/auth.guard";
import {DeliveryComponent} from "./delivery/delivery.component";
import {CreateNewEmployeeComponent} from "./create-new-employee/create-new-employee.component";
import {InplaceComponent} from "./inplace/inplace.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'table', component: TableComponent, canActivate:[AuthGuard], data:{roles:['Admin', 'Host', 'Cook', 'Waiter']}},
  { path: 'order', component: OrderComponent, canActivate:[AuthGuard], data:{roles:['Admin', 'Host', 'Cook', 'Waiter']}},
  { path: 'reservation', component: ReservationComponent, canActivate:[AuthGuard], data:{roles:['Admin', 'Host', 'Cook', 'Waiter']}},
  { path: 'delivery', component: DeliveryComponent, canActivate:[AuthGuard], data:{roles:['Admin', 'Host', 'Cook', 'Waiter']}},
  { path: 'employee', component: EmployeeComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
  { path: 'income', component: IncomeComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
  { path: 'inplace', component: InplaceComponent, canActivate:[AuthGuard], data:{roles:['Admin', 'Host', 'Cook', 'Waiter']}},
  { path: 'createnewemployee', component: CreateNewEmployeeComponent, canActivate:[AuthGuard], data:{roles:['Admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

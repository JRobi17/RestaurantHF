import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {UserService} from "./services/user.service";
import { OrderComponent } from './order/order.component';
import { EmployeeComponent } from './employee/employee.component';
import { ReservationComponent } from './reservation/reservation.component';
import { TableComponent } from './table/table.component';
import { IncomeComponent } from './income/income.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { InplaceComponent } from './inplace/inplace.component';
import { CreateNewEmployeeComponent } from './create-new-employee/create-new-employee.component';
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import { HomeComponent } from './home/home.component';
import { OrderTypeComponent } from './order-type/order-type.component';
import {BsModalService} from "ngx-bootstrap/modal";
import {PositioningService} from "ngx-bootstrap/positioning";
import {ComponentLoaderFactory} from "ngx-bootstrap/component-loader";
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ClosedOrdersComponent } from './closed-orders/closed-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    OrderComponent,
    EmployeeComponent,
    ReservationComponent,
    TableComponent,
    IncomeComponent,
    DeliveryComponent,
    InplaceComponent,
    CreateNewEmployeeComponent,
    HomeComponent,
    OrderTypeComponent,
    ClosedOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    RouterModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NgxStarRatingModule,
    ReactiveFormsModule

  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService,
    BsModalService,
    ComponentLoaderFactory,
    PositioningService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

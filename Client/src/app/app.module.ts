import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodaysMenuComponent } from './todays-menu/todays-menu.component';
import { DiscountsTodayComponent } from './discounts-today/discounts-today.component';
import { TodaysSpecialComponent } from './todays-special/todays-special.component';
import { VegItemsComponent } from './veg-items/veg-items.component';
import { SingleItemComponent } from './single-item/single-item.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FoodService } from "./food.service";
import { DummyComponent } from './dummy/dummy.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from "./token-interceptor.service";
import { EditCartComponent } from './edit-cart/edit-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodaysMenuComponent,
    DiscountsTodayComponent,
    TodaysSpecialComponent,
    VegItemsComponent,
    SingleItemComponent,
    CartComponent,
    LoginComponent,
    SignupComponent,
    DummyComponent,
    EditCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    FoodService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

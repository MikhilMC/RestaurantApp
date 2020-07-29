import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodaysMenuComponent } from './todays-menu/todays-menu.component';
import { DiscountsTodayComponent } from './discounts-today/discounts-today.component';
import { TodaysSpecialComponent } from './todays-special/todays-special.component';
import { VegItemsComponent } from './veg-items/veg-items.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SingleItemComponent } from './single-item/single-item.component';
import { DummyComponent } from './dummy/dummy.component';
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {
    path: "todays-menu",
    component: TodaysMenuComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "discounts-today",
    component: DiscountsTodayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "todays-special",
    component: TodaysSpecialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "veg-items",
    component: VegItemsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cart/:id",
    component: CartComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "food-item/:id",
    component: SingleItemComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "dummy",
    component: DummyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

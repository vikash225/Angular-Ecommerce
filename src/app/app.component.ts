import { Component, computed, inject, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { ProductService } from './product.service';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HomeComponent,
    RouterOutlet,
    CartComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Product';
  private productService = inject(ProductService);
  isVisibility = computed(() => {
    return this.productService.isVisibility();
  });
  constructor() { }
  dataFetchingStarted = computed(() => {
    return this.productService.isDataFeching();
  });
  //when any update would be happen will inform here
}

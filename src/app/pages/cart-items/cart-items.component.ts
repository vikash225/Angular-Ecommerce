import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ProductService } from '../../product.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CalculationComponent } from '../../components/calculation/calculation.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [CommonModule, RouterLink, CalculationComponent, ButtonComponent],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css',
})
export class CartItemsComponent implements OnInit, OnDestroy {
  private productservice = inject(ProductService);
  private routes = inject(Router);
  numberOfQuantity = computed(() => this.productservice.quantity());
  quantityInCart = computed(() => {
    return this.productservice.quantityArrayObjet();
  });
  cartItems = computed(() => {
    return this.productservice.cartProducts();
  });
  constructor(private toastr: ToastrService) {}
  ngOnInit(): void {
    // this.cartItems.set(this.productservice.cartProducts());

    this.productservice.isVisibility.update(
      () => !this.productservice.isVisibility()
    );
  }
  Remove(productId: number) {
    this.productservice.removeFromCart(productId);
    //for decreasing the cost value
    this.productservice.costCalculation();
    this.toastr.success('Item Removed  Successfully');
    // this.cartItems.set(this.productservice.returnCartProduct());
  }
  ngOnDestroy(): void {
    this.productservice.isVisibility.update(
      () => !this.productservice.isVisibility()
    );
  }

  PageNavigate(productId: number) {
    this.routes.navigate([`product/${productId}`]);
  }

  // calculation of increament and decrement
  Inc(productId: number) {
    this.productservice.IncAndDec(productId, 'Inc');
  }
  Dec(productId: number) {
    this.productservice.IncAndDec(productId, 'Dec');
  }
  // naviaget to home page
  NaviageToHome() {
    this.routes.navigate(['']);
  }
}

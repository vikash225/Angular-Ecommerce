import { Component, computed, effect, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ProductService } from '../../product.service';
import { CalculatinService } from '../../pages/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculation',
  standalone: true,
  imports: [ButtonComponent,CommonModule],
  templateUrl: './calculation.component.html',
  styleUrl: './calculation.component.css',
})
export class CalculationComponent {
  private productService = inject(ProductService);
  constructor() {
    this.productService.costCalculation();
  }
  numberOfItemsInCart = computed(() => {
    return this.productService.cartProducts();
  });
  totalAmount = computed(() => this.productService.totalPrice());


}

import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductService } from '../product.service';

@Injectable({
  providedIn: 'root',
})
export class CalculatinService {
  private productService = inject(ProductService);
}

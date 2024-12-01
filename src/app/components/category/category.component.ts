import { Component, inject } from '@angular/core';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories = [
    {
      "id": 1,
      "name": "electronics"
    },
    {
      "id": 2,
      "name": "jewelery"
    },
    {
      "id": 3,
      "name": "men's clothing"
    },
    {
      "id": 4,
      "name": "women's clothing"
    }
  ]
  private productService = inject(ProductService);
  private router = inject(Router);
  CategoryWiseSearch(CategoryName: string) {
    this.productService.productSearchingByUser.update(() => '');
    this.productService.FilterByCategoryName.update(() => CategoryName);
    this.router.navigate(['']);
  }
}

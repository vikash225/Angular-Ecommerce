import { Component, computed, DestroyRef, inject, OnChanges, OnDestroy, OnInit, signal, SimpleChanges } from '@angular/core';
import { ProductService } from '../../product.service';
import { ProductModel } from '../../model/product.model';
import { CardComponent } from '../../components/card/card.component';
import { RouterLink } from '@angular/router';
import { TestComponent } from '../../components/test/test.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, RouterLink, TestComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  products = computed(() => {
    const searchQueryByFillter = this.productFiltterByCategory();
    const searchQuery = this.productSearchingByUser();
    const categoryFillter = this.productService.allProducts().filter((p) =>
      p.category === searchQueryByFillter);
    const searchFillter = this.productService.allProducts().filter((p) =>
      p.category.toLowerCase().includes(this.productSearchingByUser().toLowerCase()))
    return searchQueryByFillter ? categoryFillter : searchQuery ? searchFillter : this.productService.allProducts()
  })
  isDataFetching = computed(() => this.productService.isDataFeching());
  private productService = inject(ProductService);
  private destroyRef = inject(DestroyRef);
  fetching = signal(false);
  productSearchingByUser = computed(() => this.productService.productSearchingByUser());
  productFiltterByCategory = computed(() => this.productService.FilterByCategoryName());

  constructor() {
  }
  ngOnInit(): void {
    this.productService.isDataFeching.update(() => true);
    const subscription = this.productService.fetchingProductData().subscribe({
      next: (val) => {
        this.productService.allProducts.set(val);
        this.productService.SaveProduct();
        this.productService.isDataFeching.update(() => false);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
    this.fetching.update(() => false);
  }
  SendingIdToService(productId: number) {
    this.productService.productId = productId;
  }

}
// searchingTimeStartedByUser = computed(() => this.productService.searchingTimeStartedByUser())
// isProductFoundByUser = computed(() => this.productService.isProductFoundByUser());
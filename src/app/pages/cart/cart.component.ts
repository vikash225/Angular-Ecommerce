import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../product.service';
import { ButtonComponent } from '../../components/button/button.component';
import { RatingComponent } from '../../components/rating/rating.component';
import { ProductModel } from '../../model/product.model';
import { CardComponent } from '../../components/card/card.component';
import { TestComponent } from '../../components/test/test.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    RatingComponent,
    CardComponent,
    RouterLink,
    TestComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnChanges {
  // @Input({ required: true }) productId!: string;
  private router = inject(Router);
  private productSevice = inject(ProductService);
  private destroyRef = inject(DestroyRef);
  categoryProducts = signal<ProductModel[]>([]);
  productId = input.required<string>();
  isReadmore = false;
  //using computed function
  isDataFetching = computed(() => this.productSevice.isDataFeching());
  //for button add to cart to go to cart
  isIncart = computed(() =>
    this.productSevice
      .cartProducts()
      .some((p) => p.id === Number(this.productId()))
  );
  product = computed(() => {
    const _id = parseInt(this.productId());

    let isProductFind = this.productSevice
      .allProducts()
      .find((product) => product.id === _id)!;

    if (!isProductFind) {
      this.router.navigate(['']);
      return null;
    }
    return isProductFind;
  });

  ngOnChanges(changes: SimpleChanges): void {
    this.productSevice.isDataFeching.set(true);

    if (this.product()) {
      //for giving the dynamic class

      const subsciption = this.productSevice
        .fetchingByCategories(this.product()?.category!)
        .subscribe({
          next: (val) => {
            this.categoryProducts.set(
              val.filter((p) => p.id !== Number(this.productId()))
            );
            // when data will be set in the categoryProducts
            this.productSevice.isDataFeching.set(false);
          },
        });

      this.destroyRef.onDestroy(() => {
        return subsciption.unsubscribe();
      });
    }
  }

  ngOnInit(): void {}
  ReadMore() {
    this.isReadmore = !this.isReadmore;
  }
  //add to cart controll
  addToCart(productId: number) {
    this.productSevice.adToCart(productId);
  }

  // button for go to cart
  GoToCart() {
    this.router.navigate(['cart-items']);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProductModel, quantity } from './model/product.model';
import { catchError, map, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private toastr = inject(ToastrService);
  productSearchingByUser = signal<string>('');
  productId!: number;
  FilterByCategoryName = signal<string>('');
  isDataFeching = signal(false);
  allProducts = signal<ProductModel[]>([]);
  cartProducts = signal<ProductModel[]>([]);
  quantityArrayObjet = signal<quantity[]>([]);
  totalPrice = signal<number>(0);
  quantity = signal<number>(0);
  isVisibility = signal(true);
  isInCart = signal(false);
  constructor() {
    let quantityInCart = localStorage.getItem('quantity');
    if (quantityInCart) {
      this.quantityArrayObjet.set(JSON.parse(quantityInCart));
    }
    let storeCartProducts = localStorage.getItem('carts');
    if (storeCartProducts) {
      this.cartProducts.set(JSON.parse(storeCartProducts));
    }

    let productsService = localStorage.getItem('allProducts');
    if (productsService) {
      this.allProducts.set(JSON.parse(productsService));
    }
  }
  //fetching products
  fetchingProductData() {
    return this.httpClient
      .get<ProductModel[]>('https://fakestoreapi.com/products')
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('Unable Fetch data'));
        })
      );
  }
  //fetching by category
  fetchingByCategories(category: string) {
    return this.httpClient
      .get<ProductModel[]>(
        `https://fakestoreapi.com/products/category/${category}`
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('Categories Product Fetching'));
        })
      );
  }

  adToCart(Id: number) {
    let isProductInCart = this.cartProducts().some((p) => p.id === Id);
    let isQuantityInCart = this.quantityArrayObjet().some((p) => p.id === Id);

    if (!isProductInCart) {
      let product = this.allProducts().find((product) => product.id === Id);
      if (product) {
        this.cartProducts.update(() => [...this.cartProducts(), product]);
        this.SaveCartProduct();
        this.toastr.success('Item Added to Cart Successfully');
      }
      // price in quantity
      if (!isQuantityInCart) {
        let newquantity = {
          id: Id,
          count: 1,
          price: Number(product?.price),
          inCart: true,
        };
        this.quantityArrayObjet.update(() => [
          ...this.quantityArrayObjet(),
          newquantity,
        ]);
      }
      this.SaveQuantity();
    } else {
      return;
    }
  }
  removeFromCart(Id: number) {
    let isInCart = this.cartProducts().some((product) => product.id === Id);
    this.quantityArrayObjet.update(() =>
      this.quantityArrayObjet().filter((p) => p.id !== Id)
    );
    if (isInCart) {
      this.cartProducts.update((product) => product.filter((p) => p.id !== Id));
      //updating quantity in cart
      this.quantityArrayObjet.update(() =>
        this.quantityArrayObjet().filter((p) => p.id !== Id)
      );
      //save in database
      this.SaveCartProduct();
      this.SaveQuantity();
    }
  }
  // i have to work on this
  costCalculation() {
    let total = this.quantityArrayObjet().reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.count;
      },
      0
    );
    this.totalPrice.update(() => total);
  }
  IncAndDec(producId: number, type: string) {
    if (type === 'Inc') {
      let currentPrice =
        this.totalPrice() +
        Number(this.cartProducts().find((p) => p.id === producId)?.price);
      this.totalPrice.update(() => currentPrice);
    }
    if (type === 'Dec') {
      let check = this.quantityArrayObjet().find((p) => p.id === producId);
      if (check?.count === 1) {
        return;
      }
      let currentPrice =
        this.totalPrice() -
        Number(this.cartProducts().find((p) => p.id === producId)?.price);
      this.totalPrice.update(() => currentPrice);
    }
    this.quantityArrayObjet.update(() =>
      this.quantityArrayObjet().map((obj) => {
        if (obj.id === producId) {
          if (type === 'Inc') {
            obj.count += 1;
          } else {
            obj.count -= 1;
          }
        }

        return obj;
      })
    );

    this.SaveQuantity();
  }
  //save cart Product in dataBase
  SaveCartProduct() {
    localStorage.setItem('carts', JSON.stringify(this.cartProducts()));
  }
  SaveQuantity() {
    localStorage.setItem('quantity', JSON.stringify(this.quantityArrayObjet()));
  }
  //save product in dataBase
  SaveProduct(): void {
    localStorage.setItem('allProducts', JSON.stringify(this.allProducts()));
  }
}

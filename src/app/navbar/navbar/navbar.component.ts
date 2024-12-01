import { Component, computed, inject } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { ProductService } from '../../product.service';
import { Router, RouterLink } from '@angular/router';
import { CategoryComponent } from '../../components/category/category.component';
import { UserComponent } from '../../components/user/user.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [InputComponent, RouterLink,CategoryComponent,UserComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private routes = inject(Router);
  private productService = inject(ProductService);
  Cartlength = computed(() => {
    return this.productService.cartProducts().length;
  });

  HomePage() {
    this.routes.navigate(['']);
  }
}

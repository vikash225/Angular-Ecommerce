import { afterNextRender, Component, computed, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { debounceTime } from 'rxjs';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  form = new FormGroup({
    category: new FormControl('', { validators: [Validators.required] })
  })
  private destroyeRef = inject(DestroyRef);
  private productservice = inject(ProductService);
  allProducts = computed(() => this.productservice.allProducts());
  private routes = inject(Router);
  constructor() {
    afterNextRender(() => {
      const subscription = this.form.get('category')?.valueChanges.pipe(debounceTime(800)).subscribe({
        next: (val) => {
          //this time filltering should not work
          this.productservice.FilterByCategoryName.update(() => '');
          if (val?.length) {
            this.productservice.productSearchingByUser.update(() => val)
            this.routes.navigate([''])
          }


          this.form.reset();
        }
      })
      this.destroyeRef.onDestroy(() => subscription?.unsubscribe());

    })
  }



}

import { Component, input } from '@angular/core';
import { ProductModel } from '../../model/product.model';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,RatingComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  product = input.required<ProductModel>();
}

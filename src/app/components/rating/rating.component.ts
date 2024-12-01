import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent implements OnInit {
  @Input({ required: true }) rating!: number;
  faStar = faStar;
  isRatingChanged = false;
  ngOnInit(): void {
    this.rating = Math.floor(this.rating);
    this.isRatingChanged = true;
  }
  setRating(val: number) {
    if (this.isRatingChanged == false) {
      this.rating = val;
    }
  }
}

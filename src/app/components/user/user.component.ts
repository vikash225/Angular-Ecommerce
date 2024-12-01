import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  private authService = inject(AuthService);
  isUserExist = computed(() => this.authService.isUserExist());
  router = inject(Router)
  Logout() {
    this.authService.isUserExist.update(() => false);
    this.router.navigate(['/login']);
  }
}

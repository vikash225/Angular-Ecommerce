import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required]
    })
  })
  private authService = inject(AuthService);
  private router = inject(Router);
  isPassordVisible = false;
  toggleEye() {
    this.isPassordVisible = !this.isPassordVisible
  }
  onSubmit() {

    if (this.form.valid) {
      this.authService.Login(this.form.value.email!, this.form.value.password!)
      this.form.reset();
    }

  }

  Navigate() {
    this.router.navigate(['signup']);
  }

}

import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../auth.service';
function passwordMatchValidators(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMissMatch: true };
  }
  return null;
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})


export class SignupComponent {
  form = new FormGroup({
    names: new FormGroup({
      firstName: new FormControl('', { validators: [Validators.required] }),
      lastName: new FormControl('', { validators: [Validators.required] })
    }),
    email: new FormControl('', { validators: [Validators.required] }),
    passwords: new FormGroup({
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] }),
      confirmPassword: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] }),
    }, { validators: [passwordMatchValidators] })
  })

  private authService = inject(AuthService);

  onSubmit() {

    if (this.form.valid) {
      const user = {
        id: Date.now().toString(),
        firstName: this.form.value.names?.firstName!,
        lastName: this.form.value.names?.lastName!,
        email: this.form.value.email!,
        password: this.form.value.passwords?.password!
      }

      if (user) {
        this.authService.signUp(user);
      }
    }

    this.form.reset();
  }
}

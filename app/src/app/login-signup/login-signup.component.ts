import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../utils/components/navbar/navbar.component";
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { signupValidator, loginValidator } from '../utils/validators/signing_validators/signing_validators';
import { UserManagerService } from '../utils/services/user_manager/user-manager.service';

@Component({
  selector: 'app-login-signup',
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {
  userManager = inject(UserManagerService);

  loginForm = new FormGroup({
    email_username: new FormControl('', { validators: [Validators.required, Validators.maxLength(50)] }),
    password: new FormControl('', { validators: [Validators.required, Validators.maxLength(20)] })
  });

  signupForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email, Validators.maxLength(50)] }),
    username: new FormControl('', { validators: [Validators.required, Validators.maxLength(20)] }),
    password: new FormControl('', { validators: [Validators.required, Validators.maxLength(20)] }),
    confirmPassword: new FormControl('', { validators: [Validators.required, Validators.maxLength(20)] })
  });

  onLoginSubmit() {
    console.log(this.loginForm.value);
  }

  onSignupSubmit() {
    const parsedData = signupValidator.safeParse(this.signupForm.value);

    if(!parsedData.success) {
      console.log(parsedData.error.errors[0].message);
      return;
    }

    this.userManager.signup(parsedData);

    console.log(this.signupForm.value);
  }
}

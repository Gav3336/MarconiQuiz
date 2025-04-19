import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../utils/components/navbar/navbar.component";
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { signupValidator, loginValidator } from '../utils/validators/signing_validators/signing_validators';
import { UserManagerService } from '../utils/services/user_manager/user-manager.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login-signup',
  imports: [NavbarComponent, ReactiveFormsModule, ButtonModule, ToastModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css',
  providers: [MessageService]
})
export class LoginSignupComponent {
  messageService = inject(MessageService);
  userManager = inject(UserManagerService);

  loginForm = new FormGroup({
    email_username: new FormControl('', { validators: [Validators.required, Validators.maxLength(50)] }),
    password: new FormControl('', { validators: [Validators.required, Validators.maxLength(20)] })
  });

  signupForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  onLoginSubmit() {
    console.log(this.loginForm.value);
  }

  onSignupSubmit() {
    const parsedData = signupValidator.safeParse(this.signupForm.value);

    if(!parsedData.success) {
      console.log(parsedData.error.errors[0].message);
      this.showToast('error', 'Error', parsedData.error.errors[0].message);
      return;
    }

    this.userManager.signup(parsedData);

    console.log(this.signupForm.value);
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
  }
}

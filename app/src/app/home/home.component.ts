import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginSignupComponentsComponent } from "../login-signup-components/login-signup-components.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, LoginSignupComponentsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}

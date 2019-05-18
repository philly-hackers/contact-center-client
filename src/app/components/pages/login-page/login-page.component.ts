import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(private router: Router) {}

  public login() {
    this.router.navigateByUrl('/contacts');
  }
}

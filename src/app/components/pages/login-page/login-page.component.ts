import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  public username: string;

  constructor(private router: Router, private contextService: ContextService) {}

  public login() {
    this.contextService.auth = this.username;
    this.router.navigateByUrl('/branches');
  }
}

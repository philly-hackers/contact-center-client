import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from '../../../shared/services/context.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  public username: string;

  constructor(private router: Router, private contextService: ContextService) {}

  public login() {
    if(!this.username) return;
    this.contextService.auth = this.username;
    this.router.navigateByUrl('/branches');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router){}
  
  public isLoggedIn = false;
  
  ngOnInit() {
    this.router.events.subscribe(v => {
      this.isLoggedIn = !window.location.href.includes('login');
    });
  }

  public logout() {
    this.router.navigateByUrl('/login');
  }

}

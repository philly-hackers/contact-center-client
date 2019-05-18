import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './shared/services/data.service';
import { Broadcaster } from './shared/services/broadcaster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private dataService: DataService, private broadcaster: Broadcaster){}
  
  public isLoggedIn = false;
  showProgressBar: Boolean = true;
  title = 'app';
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;

  ngOnInit() {
    this.router.events.subscribe(v => {
      this.isLoggedIn = !window.location.href.includes('login');
    });
    this.broadcaster.on('loader').subscribe(res => {
      this.showProgressBar = true;
    });
    setTimeout(() => {
      this.showProgressBar = false;
    }, 5000);
  }

  public logout() {
    this.router.navigateByUrl('/login');
  }
}

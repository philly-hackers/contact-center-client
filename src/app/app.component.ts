import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/services/data.service';
import { Broadcaster } from './shared/services/broadcaster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showProgressBar: Boolean;
  title = 'app';
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;

  constructor(private dataService: DataService, private broadcaster: Broadcaster) { }

  ngOnInit() {
    this.broadcaster.on('loader').subscribe(res => {
      this.showProgressBar = true;
    });

    setTimeout(() => {
      this.showProgressBar = false;
      
    }, 5000);
  }
}

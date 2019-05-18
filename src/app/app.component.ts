import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showProgressBar: Boolean = false;
  title = 'app';
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;

  ngOnInit() {
    setTimeout(() => {
      this.showProgressBar = true;
    }, 2000);

    setTimeout(() => {
      this.showProgressBar = false;
    }, 10000);
  }
}

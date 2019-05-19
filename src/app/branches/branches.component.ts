import { Component, OnInit } from '@angular/core';
import { Broadcaster } from '../shared/services/broadcaster.service';
import { BranchesService } from '../shared/services/branches.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  constructor( private branchService: BranchesService, private broadcaster: Broadcaster) { }

  ngOnInit() {

  }

  addBranch(params) {
    const tempParams = {
      'name': 'Atlanta',
      'address': '11575 Great Oaks Way \nSuite 200\nAlpharetta, GA 30022 \nT 678-795-4000',
      'geolocation': '34.0603291,-84.2700786',
      'isactive': null
    };
    params = params ? params : tempParams;

    this.branchService.addNewBranch(params);

  }

}

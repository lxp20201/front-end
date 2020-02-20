import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cms-home',
  templateUrl: './cms-home.component.html',
  styleUrls: ['./cms-home.component.less']
})
export class CmsHomeComponent implements OnInit {
  currentUser: string;

  constructor() { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUserCMS')
  }

}

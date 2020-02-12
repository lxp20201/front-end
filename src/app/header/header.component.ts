import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input('userActive') userActive: boolean;
  @Input('platform') platform: string;
  @Input('showHeader') showHeader: boolean;
  constructor(private authenticationService: AuthenticationService, private router: Router, ) { }

  ngOnInit() {
    console.log(this.userActive, this.showHeader,this.platform)
  }
  logout() {
    this.authenticationService.logout();
    console.log('inside logout');
    localStorage.clear();
    this.router.navigate(['/LMSlogin'], { queryParams: { currentUser: null }});
  }
}

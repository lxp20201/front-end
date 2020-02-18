import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService, AlertService } from '../_services';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.less']
})
export class AdminhomeComponent implements OnInit {
  cmsUsers = [];
  lmsUsers = [];
  constructor(private authenticationService: AuthenticationService,) { }

  ngOnInit() {
    this.authenticationService.admin_dashboard(true).subscribe((result : any) => {
      if (result.data.admin_dashboard.success === true) {
        this.cmsUsers = result.data.admin_dashboard.message;
      } else {
      }
    });
    this.authenticationService.admin_dashboard(false).subscribe((result: any) => {
      if (result.data.admin_dashboard.success === true) {
        this.lmsUsers = result.data.admin_dashboard.message;
      } else {
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService, AuthenticationService, AlertService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    allCourses:any;
    currentUser: any;
    users = [];
    email: string;
    userDetails: any = [];
    constructor(
        private authenticationService: AuthenticationService, private router: Router,
        private userService: UserService, private route: ActivatedRoute, private alertService: AlertService
    ) {
        this.route.queryParams.subscribe(params => {
            let email = params['email'];
            if (email) {
                this.router.navigate(['/dummy'])
                if (params['type'] == 'registration') {
                    var user = localStorage.getItem('userDetails');
                    this.userDetails = JSON.parse(user);
                    this.userService.updateProfileStatus(email, this.userDetails._id)
                        .pipe(first())
                        .subscribe(
                            data => {
                                if (data.data['updateUser'].data.success === true) {
                                    localStorage.setItem('currentUser', 'true');
                                    this.router.navigate(['/home']);
                                } else {
                                    localStorage.setItem('currentUser', null)
                                    this.router.navigate(['/dummy'])
                                    this.router.navigate(['/LMSlogin']);
                                    Swal.fire('Failed',data.data['updateUser'].data.message,'error');
                                }
                            },
                            error => {
                                localStorage.setItem('currentUser', null)
                                this.router.navigate(['/LMSlogin']);
                                Swal.fire('Please try after sometime','','error');
                            });
                } else if (params['type'] == 'forgotpassword') {
                    this.authenticationService.checklinkstatus(email)
                        .pipe(first())
                        .subscribe(
                            data => {
                                if (data.data['checklinkstatus'].success === true) {
                                    console.log(data)
                                    this.router.navigate(['/resetPassword', {email: email }]);
                                } else {
                                    console.log(data)
                                    localStorage.setItem('currentUser', null)
                                    this.router.navigate(['/dummy'])
                                    this.router.navigate(['/']);
                                    Swal.fire('Failed',data.data['checklinkstatus'].message,'error');
                                }
                            },
                            error => {
                                localStorage.setItem('currentUser', null)
                                this.router.navigate(['/']);
                                Swal.fire('Please try after sometime','','error');
                            });
                }

            }

        });
    }

    ngOnInit() {
        this.viewAllCourses()
        this.loadAllCourses()
        this.email = this.route.snapshot.paramMap.get('email');
    }

    private loadAllCourses() {

    }
    viewAllCourses() {

        var userid=localStorage.getItem('user_detail',)
        this.authenticationService.courseView('5e4a55ef8d7a8e19fc65fd9e').subscribe((result) => {
          console.log(result,'llllllllllllllllllllllllllllllllllllll')
          if(result){
              this.allCourses=result.data
          }
        });
    }
}
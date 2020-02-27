import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService, AuthenticationService, AlertService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    allCourses: any;
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
                console.log(params, Boolean(params['is_staff']))
                if (params['type'] == 'registration') {
                    if ((params['is_staff']) == 'true') {
                        var user = localStorage.getItem('userDetailsCMS');
                        this.userDetails = JSON.parse(user);
                        console.log(user)
                    } else {
                        var user = localStorage.getItem('userDetailsLMS');
                        this.userDetails = JSON.parse(user);
                        console.log(user)
                    }
                    console.log('inside verifying process : ', this.userDetails)
                    this.userService.updateProfileStatus(email, this.userDetails._id)
                        .pipe(first())
                        .subscribe(
                            data => {
                                if (data.data['updateUser'].data.success === true) {
                                    console.log('inside verifying process true: ', data.data['updateUser'])
                                    if (this.userDetails.is_staff == true) {
                                        localStorage.setItem('currentUserCMS', 'true');
                                        this.router.navigate(['/CmsHome']);
                                    } else if (this.userDetails.is_staff == false) {
                                        localStorage.setItem('currentUserLMS', 'true');
                                        this.router.navigate(['/home']);
                                    }
                                                                      
                                } else {
                                    console.log('inside verifying process false: ', data.data['updateUser'])
                                    this.router.navigate(['/dummy'])
                                    if (this.userDetails.is_staff == true) {
                                        localStorage.setItem('currentUserCMS', null)
                                        this.router.navigate(['/CMSlogin']);
                                    } else if (this.userDetails.is_staff == false) {
                                        localStorage.setItem('currentUserLMS', null)
                                        this.router.navigate(['/LMSlogin']);
                                    }
                                    Swal.fire('Failed', data.data['updateUser'].data.message, 'error');
                                }
                            },
                            error => {
                                console.log('inside verifying process error: ', error)
                                if (this.userDetails.is_staff == true) {
                                    localStorage.setItem('currentUserCMS', null)
                                    this.router.navigate(['/CMSlogin']);
                                } else if (this.userDetails.is_staff == false) {
                                    localStorage.setItem('currentUserLMS', null)
                                    this.router.navigate(['/LMSlogin']);
                                }
                                Swal.fire('Please try after sometime', '', 'error');
                            });
                } else if (params['type'] == 'forgotpassword') {
                    this.authenticationService.checklinkstatus(email)
                        .pipe(first())
                        .subscribe(
                            data => {
                                this.alertService.email = email;
                                if (data.data['checklinkstatus'].success === true) {
                                    console.log(data)
                                    this.alertService.email = email;
                                    if ((params['is_staff']) == 'true') {
                                        this.router.navigate(['/CMSResetPassword']);
                                    } else {
                                        this.router.navigate(['/LMSResetPassword']);
                                    }
                                } else {
                                    this.router.navigate(['/dummy'])
                                    console.log(data)
                                    if ((params['is_staff']) == 'true') {
                                        localStorage.setItem('currentUserCMS', null)
                                        this.router.navigate(['/Cmshome']);
                                    }
                                    else {
                                        localStorage.setItem('currentUserLMS', null)
                                        this.router.navigate(['/']);
                                    }
                                    Swal.fire('Failed', data.data['checklinkstatus'].message, 'error');
                                }
                            },
                            error => {
                                localStorage.setItem('currentUserCMS', null)
                                localStorage.setItem('currentUserLMS', null)
                                this.router.navigate(['/']);
                                Swal.fire('Please try after sometime', '', 'error');
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
    onClickEnroll() {
        this.authenticationService
        .enrollcourse(
            "5e4d30c64913811384d8b441",
            "5e4525f32f5ce1428cb0464b",
            "5e453b251310327d9af482a5"
          )
        .subscribe(result => {
            console.log("result", result)
        //   if (result.data["resetpassword"].success === true) {
        //     this.router.navigate(["/home"]);
        //     Swal.fire(
        //       "Success!",
        //       "A mail has been sent to your account",
        //       "success"
        //     );
        //   } else {
        //     Swal.fire("Failed!", result.data["resetpassword"].message, "error");
        //   }
        });

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to view course!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Enroll Now!'
          }).then((result) => {
                console.log("result.value", result.value)
                if (result.value) {
                Swal.fire(
                    'Enrolled',
                    'Your course has been enrolled.',
                    'success'
                )
                }
          })
    }

    viewAllCourses() {

        var userid = localStorage.getItem('user_detail')
        this.authenticationService.courseView('5e4a55ef8d7a8e19fc65fd9e').subscribe((result) => {
            console.log(result, 'llllllllllllllllllllllllllllllllllllll')
            if (result) {
                this.allCourses = result.data
            }
        });
    }
}
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService, AuthenticationService, AlertService, courseCreaterService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {

    currentUser: any;
    users = [];
    activeUser: boolean;
    email: string;
    userDetails: any = [];
    constructor(
        private authenticationService: AuthenticationService, private router: Router, public coursecreaterService: courseCreaterService,
        private userService: UserService, private route: ActivatedRoute, private alertService: AlertService
    ) {
        this.route.queryParams.subscribe(params => {
            let email = params['email'];
            if (email) {
                this.router.navigate(['/dummy'])
                var user = localStorage.getItem('userDetails');
                this.userDetails = JSON.parse(user);
                this.userService.updateProfile(email, this.userDetails._id)
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
                                Swal.fire(data.data['updateUser'].data.message);
                            }
                        },
                        error => {
                            localStorage.setItem('currentUser', null)
                            this.router.navigate(['/LMSlogin']);
                            Swal.fire('Please try after sometime');
                        });
            }

        });
    }

    ngOnInit() {
        this.loadAllCourses()
        this.email = this.route.snapshot.paramMap.get('email');
    }

    // deleteUser(id: number) {
    //     this.userService.delete(id)
    //         .pipe(first())
    //         .subscribe(() => this.loadAllCourses());
    // }

    private loadAllCourses() {
        this.coursecreaterService.getCourse()
            .pipe(first())
            .subscribe((users: any) => {
                this.users = users;
                // console.log(this.users)
            });
    }
}
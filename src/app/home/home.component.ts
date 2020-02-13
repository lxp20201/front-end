import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService, AuthenticationService, AlertService, courseCreaterService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {

    currentUser: any;
    users = [];
    activeUser: boolean;
    email: string;
    userDetails : any = [];
    constructor(
        private authenticationService: AuthenticationService, private router: Router, public coursecreaterService : courseCreaterService,
        private userService: UserService, private route: ActivatedRoute, private alertService: AlertService
    ) {
        this.route.queryParams.subscribe(params => {
            let email = params['email'];
            if (email) {
                this.router.navigate(['/dummy'])
                console.log(email); // Print the parameter to the console. 
                this.userDetails = localStorage.getItem('userDetails');
                this.userService.updateProfile(email,this.userDetails._id)
                    .pipe(first())
                    .subscribe(
                        data => {
                            console.log(data);
                            if (data.data['updateUser'].data.success === true) {
                                localStorage.setItem('currentUser', JSON.stringify(data));
                                this.router.navigate(['/home']);
                            } else {
                                this.router.navigate(['/LMSlogin']);
                                this.alertService.error(data.data['updateUser'].data.message);
                            }
                        },
                        error => {
                            console.log(error)
                            this.router.navigate(['/LMSlogin']);
                            this.alertService.error('Please try after sometime');
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
            .subscribe((users : any) => {
                this.users = users;
                // console.log(this.users)
            });
    }
}
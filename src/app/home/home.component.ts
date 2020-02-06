import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService, AuthenticationService } from '../_services';
import { ActivatedRoute } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {

    currentUser: any;
    users = [];
    activeUser: boolean;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService, private route: ActivatedRoute,
    ) {
        // this.currentUser = this.authenticationService.currentUserValue;
        // this.activeUser = this.authenticationService.currentUserValue ? true : false;
    }

    ngOnInit() {
        console.log('inside home',this.route.snapshot.queryParams['currentUser'])
        this.currentUser = this.route.snapshot.queryParams['currentUser'] ? this.route.snapshot.queryParams['currentUser'] : this.authenticationService.currentUserValue
        console.log('currentUser',this.currentUser)
        // this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe((users) => {
                this.users = users;
                console.log(this.users)
            });
    }
}
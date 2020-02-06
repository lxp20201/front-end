import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from './_services';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: any;
    activeUser: boolean;
    showHeader: boolean;

    constructor(
        private router: Router, private location: Location,
        private authenticationService: AuthenticationService,
    ) {
        this.authenticationService.currentUser.subscribe((x) => {
            this.currentUser = x;
            this.activeUser = this.currentUser ? true : false;
        });
    }

    ngOnInit() {
        this.router.events.subscribe((e: any) => {
            console.log(e)
            if ((e && (e.url === '/register' || e.snapshot && e.snapshot._routerState.url === '/register' ||
                e.routerEvent && e.routerEvent.url === '/register')))
                this.showHeader = false;
            else if ((e && (e.url === '/login' || e.snapshot && e.snapshot._routerState.url === '/login' ||
            e.routerEvent && e.routerEvent.url === '/login')))
                this.showHeader = false;
            else
                this.showHeader = true;

        });
    }
}
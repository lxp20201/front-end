import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from './_services';
import { type } from 'os';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: any;
    showHeader: boolean;
    platform: any;

    constructor(
        private router: Router) {
    }
    logout() {
        // this.authenticationService.logout();
        this.currentUser = null;
        localStorage.clear();
        localStorage.setItem('currentUser', null);
        console.log(this.currentUser, typeof this.currentUser)
        if (this.platform == 'LMS')
            this.router.navigate(['/LMSlogin'], { queryParams: { currentUser: null } });
        else if (this.platform == 'Admin')
            this.router.navigate(['/admin'], { queryParams: { currentUser: null } });
        else
            this.router.navigate(['/CMSlogin'], { queryParams: { currentUser: null } });
    }
    ngOnInit() {
        this.platform = null
        this.router.events.subscribe((e: any) => {
            // console.log(e)
            this.currentUser = localStorage.getItem('currentUser');
            console.log(this.currentUser,typeof this.currentUser)
            if ((e && (e.url === '/LMSregister' || e.snapshot && e.snapshot._routerState.url === '/LMSregister' ||
                e.routerEvent && e.routerEvent.url === '/LMSregister'))) {
                this.showHeader = false;
                this.platform = 'LMS';
                this.currentUser = null;
                localStorage.setItem('currentUser', null);
            }
            else if ((e && (e.url === '/LMSlogin' || e.snapshot && e.snapshot._routerState.url === '/LMSlogin' ||
                e.routerEvent && e.routerEvent.url === '/LMSlogin'))) {
                this.showHeader = false;
                this.platform = 'LMS';
                this.currentUser = null;
                localStorage.setItem('currentUser', null);
            }
            else if ((e && (e.url === '/CMSregister' || e.snapshot && e.snapshot._routerState.url === '/CMSregister' ||
                e.routerEvent && e.routerEvent.url === '/CMSregister'))) {
                this.showHeader = false;
                this.platform = 'CMS';
                this.currentUser = null;
                localStorage.setItem('currentUser', null);
            }
            else if ((e && (e.url === '/CMSlogin' || e.snapshot && e.snapshot._routerState.url === '/CMSlogin' ||
                e.routerEvent && e.routerEvent.url === '/CMSlogin'))) {
                this.showHeader = false;
                this.platform = 'CMS';
                this.currentUser = null;
                localStorage.setItem('currentUser', null);
            }
            else if ((e && (e.url === '/forgetPassword' || e.snapshot && e.snapshot._routerState.url === '/forgetPassword' ||
                e.routerEvent && e.routerEvent.url === '/forgetPassword'))) {
                this.showHeader = false;
                this.platform = 'LMS';
                this.currentUser = null;
                localStorage.setItem('currentUser', null);
            }
            else if ((e && (e.url === '/forgetPassword' || e.snapshot && e.snapshot._routerState.url === '/forgetPassword' ||
                e.routerEvent && e.routerEvent.url === '/forgetPassword'))) {
                this.showHeader = false;
                this.platform = 'CMS';
                this.currentUser = null;
                localStorage.setItem('currentUser', null);
            }
            else if ((e && (e.url === '/resetPassword' || e.snapshot && e.snapshot._routerState.url === '/resetPassword' ||
                e.routerEvent && e.routerEvent.url === '/resetPassword'))) {
                this.showHeader = false;
                this.platform = 'LMS';
                this.currentUser = null;
                localStorage.setItem('currentUser', null);
            }
            else if ((e && (e.url === '/resetPassword' || e.snapshot && e.snapshot._routerState.url === '/resetPassword' ||
                e.routerEvent && e.routerEvent.url === '/resetPassword'))) {
                this.showHeader = false;
                this.platform = 'CMS';
                this.currentUser = null;
                localStorage.setItem('currentUser', null);
            }
            else if ((e && (e.url === '/CmsHome' || e.snapshot && e.snapshot._routerState.url === '/CmsHome' ||
                e.routerEvent && e.routerEvent.url === '/CmsHome'))) {
                this.showHeader = true;
                this.platform = 'CMS';
            }
            else if ((e && (e.url === '/' || e.snapshot && e.snapshot._routerState.url === '/' ||
                e.routerEvent && e.routerEvent.url === '/'))) {
                this.showHeader = true;
                this.platform = 'LMS';
            }
            else if ((e && (e.url === '/adminDashboard' || e.snapshot && e.snapshot._routerState.url === '/adminDashboard' ||
                e.routerEvent && e.routerEvent.url === '/adminDashboard'))) {
                this.showHeader = true;
                this.platform = 'Admin';
            }
            else if ((e && (e.url === '/admin' || e.snapshot && e.snapshot._routerState.url === '/admin' ||
                e.routerEvent && e.routerEvent.url === '/admin'))) {
                this.showHeader = false;
                this.platform = 'Admin';
                this.currentUser = null;
                localStorage.setItem('currentUser', null);
            }
            else if ((e && (e.url === '/dummy' || e.snapshot && e.snapshot._routerState.url === '/dummy' ||
                e.routerEvent && e.routerEvent.url === '/dummy')))
                this.showHeader = false;
            else
                this.showHeader = true;
        });
    }
}
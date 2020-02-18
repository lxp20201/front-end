import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from './_services';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: any;
    activeUser: boolean;
    showHeader: boolean;
    platform: any;

    constructor(
        private router: Router) {
        // this.authenticationService.currentUser.subscribe((x) => {
        //     this.currentUser = x;
        //     this.activeUser = this.currentUser ? true : false;
        //     console.log(this.activeUser)
        // });

    }
    logout() {
        // this.authenticationService.logout();
        console.log('inside logout');
        this.activeUser = false;
        localStorage.clear();
        if (this.platform == 'LMS')
            this.router.navigate(['/LMSlogin'], { queryParams: { currentUser: null } });
        else
            this.router.navigate(['/CMSlogin'], { queryParams: { currentUser: null } });
    }
    ngOnInit() {
        this.platform = null
        this.router.events.subscribe((e: any) => {
            // console.log(e)
            this.currentUser = localStorage.getItem('currentUser');
            this.activeUser = this.currentUser ? true : false;
            console.log('wedfsdfds', this.currentUser, this.activeUser)
            if ((e && (e.url === '/LMSregister' || e.snapshot && e.snapshot._routerState.url === '/LMSregister' ||
                e.routerEvent && e.routerEvent.url === '/LMSregister'))) {
                this.showHeader = false;
                this.platform = 'LMS';
            }
            else if ((e && (e.url === '/LMSlogin' || e.snapshot && e.snapshot._routerState.url === '/LMSlogin' ||
                e.routerEvent && e.routerEvent.url === '/LMSlogin'))) {
                this.showHeader = false;
                this.platform = 'LMS';
            }
            else if ((e && (e.url === '/CMSregister' || e.snapshot && e.snapshot._routerState.url === '/CMSregister' ||
                e.routerEvent && e.routerEvent.url === '/CMSregister'))) {
                this.showHeader = false;
                this.platform = 'CMS';
            }
            else if ((e && (e.url === '/CMSlogin' || e.snapshot && e.snapshot._routerState.url === '/CMSlogin' ||
                e.routerEvent && e.routerEvent.url === '/CMSlogin'))) {
                this.showHeader = false;
                this.platform = 'CMS';
            }
            else if ((e && (e.url === '/LMSForgetPassword' || e.snapshot && e.snapshot._routerState.url === '/LMSForgetPassword' ||
                e.routerEvent && e.routerEvent.url === '/LMSForgetPassword'))) {
                this.showHeader = false;
                this.platform = 'LMS';
            }
            else if ((e && (e.url === '/CMSForgetPassword' || e.snapshot && e.snapshot._routerState.url === '/CMSForgetPassword' ||
                e.routerEvent && e.routerEvent.url === '/CMSForgetPassword'))) {
                this.showHeader = false;
                this.platform = 'CMS';
            }
            else if ((e && (e.url === '/LMSconfirmPassword' || e.snapshot && e.snapshot._routerState.url === '/LMSconfirmPassword' ||
                e.routerEvent && e.routerEvent.url === '/LMSconfirmPassword'))) {
                this.showHeader = false;
                this.platform = 'LMS';
            }
            else if ((e && (e.url === '/CMSconfirmPassword' || e.snapshot && e.snapshot._routerState.url === '/CMSconfirmPassword' ||
                e.routerEvent && e.routerEvent.url === '/CMSconfirmPassword'))) {
                this.showHeader = false;
                this.platform = 'CMS';
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
            else if ((e && (e.url === '/dummy' || e.snapshot && e.snapshot._routerState.url === '/dummy' ||
                e.routerEvent && e.routerEvent.url === '/dummy')))
                this.showHeader = false;

                else if ((e && (e.url === '/dashboard' || e.snapshot && e.snapshot._routerState.url === '/dashboard' ||
                e.routerEvent && e.routerEvent.url === '/dashboard'))){
                    this.showHeader = true;
                    this.platform = 'Admin';
                }

                else if ((e && (e.url === '/admin' || e.snapshot && e.snapshot._routerState.url === '/admin' ||
                e.routerEvent && e.routerEvent.url === '/admin'))){
                    this.showHeader = false;
                    this.platform = 'Admin';
                }
            else
                this.showHeader = true;

        });
    }
}
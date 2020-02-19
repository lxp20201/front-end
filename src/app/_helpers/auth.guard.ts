import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';
import { stat } from 'fs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const currentUser = this.authenticationService.currentUserValue;
        const currentUser = localStorage.getItem('currentUser')
        console.log(currentUser,typeof currentUser,state)
        if (currentUser != 'null') {
            console.log('currentUser,',currentUser,typeof currentUser)
            // authorised so return true
            return true;
        } else {
            console.log('url',this.router.url)
            this.router.navigate(['/']);
            return false;
        }

        // not logged in so redirect to login page with the return url
       
    }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { LoginComponent } from './login';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    
    currentUser: any;
    activeUser: boolean;
    showHeader: boolean;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        // private Login : LoginComponent,
    ) {
        this.authenticationService.currentUser.subscribe((x) => {
            this.currentUser = x;
            this.activeUser = this.currentUser ? true : false;
        });
      
        if (this.router.url === '/login' || this.router.url === '/register')
            this.showHeader = false;
        // else if ()
        else
            this.showHeader = true;
    }
    ngOnInit() {
        // this.Login.currentMessage.subscribe(message => console.log(message))
        console.log(this.router, this.router.url)
    }
}
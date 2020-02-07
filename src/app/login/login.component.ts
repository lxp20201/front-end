import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '../_services'
import { AppComponent } from '../app.component';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    loading = false;
    returnUrl: string;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        public app: AppComponent
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)]),
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            // this.alertService.error('Please fill required details correctly');
            return;
        }
        this.loading = true;
        var d;
        d = false;
        let payload = new FormData();
        payload.append("email", this.loginForm.value.email);
        payload.append('password', this.loginForm.value.password);
        payload.append('remember', d);
        console.log(payload,'payloadpayload')
        this.authenticationService.login(payload)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    this.router.navigate(['/']);
                },
                error => {
                    console.log(error)
                    if(error == 'Forbidden'){
                        this.loading = false;
                        this.alertService.error('In order to sign in, you need to activate your account.');
                    }
                    // this.alertServic e.error(error);
                });
    }
}
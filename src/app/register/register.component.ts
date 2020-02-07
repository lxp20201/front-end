import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MustMatch } from '../_helpers/must-match.validator';
import { UserService, AuthenticationService, AlertService } from '../_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/), Validators.minLength(3), Validators.maxLength(100)]),
            username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/), Validators.minLength(1), Validators.maxLength(100)]),
            email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
            mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[6-9]\d{9}\1*$/)]),
            organization: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z 0-9]+$/), Validators.minLength(3), Validators.maxLength(100)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)]),
            confirmpassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
        }, {
            validator: MustMatch('password', 'confirmpassword')
        });
    }

    // convenience getter for easy access to form fields///---/^[6-9]\d{9}\1*$/-------\\1{5}
    get f() { return this.registerForm.controls; }

    post() {
        var payload = new FormData();
        payload.append("name", this.registerForm.value.name);
        payload.append('username', this.registerForm.value.username);
        payload.append('email', this.registerForm.value.email);
        payload.append('password', this.registerForm.value.password);
        payload.append("organization", this.registerForm.value.organization);
        payload.append('mobile', this.registerForm.value.mobile);
        // payload.append('lastName', this.registerForm.value.lastName);
        payload.append('honor_code', 'true');
        payload.append('terms_of_service','true');
        console.log(payload,'payloadpayload')
        this.loading = true

        let details = {
            name :this.registerForm.value.name,
	        email: this.registerForm.value.email
        }
        this.userService.register(payload).pipe(first()).subscribe(
            data => {
                console.log(data)
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login'], { queryParams: { registered: true } });
                this.userService.verifyemail(details).pipe(first()).subscribe(
                    data1 => {
                        console.log(data1,'data1data1')
                    }, error => {
                        // this.alertService.error(error);
                    })
            }, error => {
                this.alertService.error(error);
            });
    }

    onSubmit() {
        console.log('inside', this.registerForm)
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.registerForm.valid) {
            this.post();
        } else if (this.registerForm.value.password != this.registerForm.value.confirmpassword) {
            this.alertService.error('Passwords doesnt match');
            return;
        } else {
            return;
        }
    }
}
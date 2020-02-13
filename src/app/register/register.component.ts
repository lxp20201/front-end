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
    userDetails: any ;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        console.log(this.router.url)
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/), Validators.minLength(3), Validators.maxLength(100)]),
            username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/), Validators.minLength(3), Validators.maxLength(30)]),
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
        this.loading = true
        var honor_code = true
        var terms_of_service = true
        if (this.router.url === '/LMSregister') {
            var is_staff = false;
        } else {
            is_staff = true;
        }
        this.authenticationService.register(this.registerForm.value.email,
            this.registerForm.value.name, this.registerForm.value.username, honor_code,
            terms_of_service, this.registerForm.value.password, this.registerForm.value.organization,
            this.registerForm.value.mobile, this.registerForm.value.confirmpassword, is_staff

        ).pipe(first()).subscribe(data => {
            if (data.data['signin']['data'].success === true) {
                this.alertService.success('Registration successful, a mail has been sent to your account. Please Verify to login', true);
                this.router.navigate(['/'], { queryParams: { registered: true } });
                localStorage.setItem('csrfToken', JSON.stringify(data.data['signin']['data'].csrftoken));
                localStorage.setItem('userDetails', JSON.stringify(data.data['signin']['data']['user_detail']));
                var u =localStorage.getItem('userDetails');
                this.userDetails = JSON.parse(u);
                
                this.userService.verifyemail(this.userDetails.email,this.userDetails._id).pipe(first()).subscribe(
                    data1 => {
                        if (data1.data['verifyemail']['data'].success === false) {
                            this.alertService.clear();
                            this.alertService.error(data1.data['verifyemail']['data'].message)
                        }
                    })
            } else {
                this.loading = false
                this.alertService.error(data.data['signin']['data'].message)
            }

        })
    }

    onSubmit() {
        this.alertService.clear();
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
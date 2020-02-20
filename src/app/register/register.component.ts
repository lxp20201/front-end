import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MustMatch } from '../_helpers/must-match.validator';
import { UserService, AuthenticationService, AlertService } from '../_services';
import Swal from 'sweetalert2'
@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    loading = false;
    userDetails: any;
    platform: string;
    is_staff: boolean;
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
        if (this.router.url == '/LMSregister')
            this.platform = 'LMS'
        if (this.router.url == '/CMSregister')
            this.platform = 'CMS'
        console.log(this.platform)
        this.registerForm = this.formBuilder.group({
            username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z 0-9]+$/), Validators.minLength(3), Validators.maxLength(100)]),
            name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z 0-9]+$/), Validators.minLength(3), Validators.maxLength(100)]),
            email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
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
            this.is_staff = false;
        } else {
            this.is_staff = true;
        }
        this.authenticationService.register(this.registerForm.value.email,
            this.registerForm.value.name, this.registerForm.value.username, honor_code,
            terms_of_service, this.registerForm.value.password, this.registerForm.value.organization,
            this.registerForm.value.mobile, this.registerForm.value.confirmpassword, this.is_staff

        ).pipe(first()).subscribe(data => {
            if (data.data['signin']['data'].success === true) {
                this.registerForm.reset()
                localStorage.setItem(this.platform == 'LMS' ? 'userDetailsLMS' : 'userDetailsCMS', JSON.stringify(data.data['signin']['data']['user_detail']));
                localStorage.setItem(this.platform == 'LMS' ? 'csrfTokenLMS' : 'csrfTokenCMS', JSON.stringify(data.data['signin']['data'].csrftoken));
                var u = localStorage.getItem(this.platform == 'LMS' ? 'userDetailsLMS' : 'userDetailsCMS');
                this.userDetails = JSON.parse(u);
                console.log(this.userDetails,this.userDetails.username + this.userDetails.name)
                this.userService.verifyemail(this.userDetails.email, this.userDetails._id,
                    this.userDetails.username + ' '+ this.userDetails.name,this.userDetails.is_staff).pipe(first()).subscribe((data1: any) => {
                        if (data1.data.verifymail.data.success === false) {
                            console.log('inside reg false :',this.platform ,this.userDetails)
                            this.registerForm.reset()
                            this.loading = false
                            Swal.fire(data1.data.verifymail.data.message)
                        } else {
                            console.log('inside reg true :',this.platform ,this.userDetails)
                            this.loading = false;
                            if (this.platform == 'LMS')
                                this.router.navigate(['/']);
                            else if (this.platform == 'CMS')
                                this.router.navigate(['/CmsHome']);
                            Swal.fire('Registration successful', 'A mail has been sent to your account. Please Verify to login', "success");
                        }
                    })
            } else {
                this.loading = false
                this.registerForm.reset()
                Swal.fire({
                    title: 'Failed!',
                    text: data.data['signin']['data'].message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                // swal(data.data['signin']['data'].message, '', 'error')
            }
        })
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.post();
        } else {
            Swal.fire({
                title: 'Required!',
                text: 'Please fill required details correctly',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return;
        }
    }
}
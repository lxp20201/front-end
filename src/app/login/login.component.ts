import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService, AlertService } from '../_services'
import { AppComponent } from '../app.component';
import Swal from 'sweetalert2'
@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    platform: string;
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
    ) { }

    ngOnInit() {
        if (this.router.url == '/LMSlogin')
            this.platform = 'LMS'
        if (this.router.url == '/CMSlogin')
            this.platform = 'CMS'
        this.loginForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)]),
        });
    }
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            Swal.fire({
                title: 'Required!',
                text: 'Please fill required details correctly',
                icon: 'error',
                confirmButtonText: 'OK'
              })
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.loginForm.value.password, this.loginForm.value.email).subscribe((result) => {
            if (result.data['login'].data.success === true) {
                localStorage.setItem('currentUser', 'true')
                this.router.navigate(['/home']);
                this.loading = false;
            } else {
                this.loading = false;
                Swal.fire({
                    title: 'Failed!',
                    text: result.data['login'].data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                  })
            }
        });
    }
}
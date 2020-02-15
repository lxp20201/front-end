import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, AlertService } from '../_services'
import { AppComponent } from '../app.component';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    platform: string;
    loginForm: FormGroup;
    submitted = false;
    loading = false;
    returnUrl: string;
    is_staff : boolean
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        public app: AppComponent
    ) { }

    ngOnInit() {
        console.log('e', this.router.url)
        if (this.router.url == '/LMSlogin') {
            this.platform = 'LMS'
            this.is_staff = false
        }
        if (this.router.url == '/CMSlogin'){
            this.platform = 'CMS'
            this.is_staff = true
        }
        this.loginForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)]),
        });
    }
    // 'http://192.168.0.44:3000/graphql'
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
        this.authenticationService.login(this.loginForm.value.password, this.loginForm.value.email,this.is_staff).subscribe( (result) => {
            if (result.data['login'].data.success === true) {
                console.log(result)
                localStorage.setItem('currentUser', 'true')
                this.router.navigate(['/home']);
                this.loading = false;
            } else {
                console.log(result)
                this.loading = false;
                this.alertService.error(result.data['login'].data.message)
            }
        });
    }
}
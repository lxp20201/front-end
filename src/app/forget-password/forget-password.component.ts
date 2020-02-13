import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, AlertService } from '../_services'
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  // styleUrls: ['./forget-password.component.less']
})
export class ForgetPasswordComponent implements OnInit {
  platform: string;
  ForgetPasswordForm: FormGroup;
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
    if (this.router.url == '/LMSForgetPassword')
      this.platform = 'LMS'
    if (this.router.url == '/CMSForgetPassword')
      this.platform = 'CMS'
    this.ForgetPasswordForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.ForgetPasswordForm.controls; }

  onSubmit() {

  }
}

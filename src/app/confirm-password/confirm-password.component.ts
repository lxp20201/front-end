import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from '../_helpers/must-match.validator';
import { AlertService, AuthenticationService } from '../_services';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.less']
})
export class ConfirmPasswordComponent implements OnInit {
  confirmPasswordForm: FormGroup;
  email: any;
  constructor(private formBuilder: FormBuilder, private route: Router, private alertService: AlertService,
    private authenticationService: AuthenticationService, private router: ActivatedRoute) {
       }

     
  ngOnInit() {
    this.confirmPasswordForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)]),
      confirmpassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
    }, {
      validator: MustMatch('password', 'confirmpassword')
    });
    // this.email = this.router.snapshot.paramMap.get('email')
    this.email = this.alertService.email;
    console.log('this.email',this.email)
  }

  get f() { return this.confirmPasswordForm.controls; }

  onSubmit() {
    this.alertService.clear();
    if (this.confirmPasswordForm.valid) {
      console.log(this.confirmPasswordForm.valid)
      this.post();
    } else {
      this.alertService.error('Please Enter Passwords Correctly!');
      return;
    }
  }

  post() {
    this.authenticationService.confirmPassword(this.email, this.confirmPasswordForm.value.password).subscribe((result) => {
      console.log(result, 'result')
      if (result.data['confirmpassword'].success === true) {
        this.route.navigate(['/home']);
        Swal.fire('Success!', 'Password has been updated', 'success');
      } else {
        Swal.fire('Failed!', result.data['confirmpassword'].message, 'error');
      }
    })
  }

}

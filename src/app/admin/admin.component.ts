import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
    private router: Router ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)]),
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      Swal.fire({
        title: 'Required!',
        text: 'Please fill required details correctly',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return;
    }
    this.authenticationService.login(this.loginForm.value.password, this.loginForm.value.email, true).subscribe((result: any) => {
      if (result.data.login.data.success == true) {
        localStorage.setItem('currentUser', 'true')
        this.router.navigate(['/adminDashboard']);
        // this.loading = false;
      } else {  
        Swal.fire({
          title: 'Inavlid!',
          text: 'Invalid Login Credentials',
          icon: 'error',
          confirmButtonText: 'OK'
        })  
      }
    });
  }
}

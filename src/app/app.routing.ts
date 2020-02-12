import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ForgetPasswordComponent } from './forget-password';
import { AuthGuard } from './_helpers';
import { DummyComponent } from './dummy';
import { CmsHomeComponent } from './cms-home/cms-home.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'LMSlogin', component: LoginComponent },
    { path: 'LMSregister', component: RegisterComponent },
    { path: 'CMSlogin', component: LoginComponent },
    { path: 'CMSregister', component: RegisterComponent },
    { path: 'LMSForgetPassword', component: ForgetPasswordComponent },
    { path: 'CMSForgetPassword', component: ForgetPasswordComponent },
    { path: '', component: HomeComponent  },
    { path : 'dummy', component: DummyComponent},
    { path : 'CmsHome', component: CmsHomeComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ForgetPasswordComponent } from './forget-password';
import { AuthGuard } from './_helpers';
import { DummyComponent } from './dummy';
import { CmsHomeComponent } from './cms-home/cms-home.component';
import { ConfirmPasswordComponent } from './confirm-password';
import { AdminComponent } from './admin/admin.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { CourseCreationComponent } from './course-creation/course-creation.component';
import {CourseviewComponent} from './courseview/courseview.component'
import { from } from 'rxjs';
const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'LMSlogin', component: LoginComponent },
    { path: 'LMSregister', component: RegisterComponent },
    { path: 'CMSlogin', component: LoginComponent },
    { path: 'CMSregister', component: RegisterComponent },
    { path: 'forgetPassword', component: ForgetPasswordComponent },
    { path: 'resetPassword', component: ConfirmPasswordComponent },
    { path: '', component: HomeComponent  },
    { path : 'dummy', component: DummyComponent},
    { path : 'CmsHome', component: CmsHomeComponent},
    { path : 'admin', component: AdminComponent},
    { path : 'adminDashboard', component: AdminhomeComponent,canActivate: [AuthGuard] },
    { path : 'courseCreation', component: CourseCreationComponent},
    { path :'courseview',component:CourseviewComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
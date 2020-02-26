import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { GraphqlModule } from './graphql/graphql.module';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import { HeaderComponent } from './header/header.component';
import { DummyComponent } from './dummy/dummy.component';
import { CmsHomeComponent } from './cms-home/cms-home.component';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AdminComponent } from './admin/admin.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { CourseCreationComponent } from './course-creation/course-creation.component';
import { CourseviewComponent } from './courseview/courseview.component';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        ApolloModule,
        HttpLinkModule,
        GraphqlModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        HeaderComponent,
        DummyComponent,
        CmsHomeComponent,
        ConfirmPasswordComponent,
        ForgetPasswordComponent,
        AdminComponent,
        AdminhomeComponent,
        CourseCreationComponent,
        CourseviewComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
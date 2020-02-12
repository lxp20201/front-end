import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { login,signin } from '../operations/mutation';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient, private Apollo :Apollo,) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value || null;
    }

    // login(data) {
    //     return this.http.post<any>(`http://192.168.0.74:8082/user_api/v1/account/login_session/`,data)
    //         .pipe(map(user => {
    //             console.log(user)
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('currentUser', JSON.stringify(user));
    //             this.currentUserSubject.next(user);
    //             return user;
    //         }));
    // }

    login(password,email) {
        return this.Apollo
          .mutate({
            mutation: login,
            variables: {
                password: password,
                email: email,
                remember: false
            }
          });
      }
      register(email,name,username,honor_code,terms_of_service,password,organization,mobile,confirmpassword,is_staff){
        return this.Apollo
        .mutate({
          mutation: signin,
          variables: {
              email: email,
              name:name,
              username:username,
              honor_code:honor_code,
              terms_of_service:terms_of_service,
              password: password,
              organization:organization,
              mobile:mobile,
              confirmpassword:confirmpassword,
              is_staff:is_staff
          }
        });
      }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
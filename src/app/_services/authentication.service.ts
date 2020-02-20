import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { courseView} from '../operations/query';
import { login, signin, admin_dashboard, resetpassword, confirmpassword, checklinkstatus ,coursecreation} from '../operations/mutation';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private Apollo: Apollo, ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value || null;
  }


  login(password, email, is_staff) {
    return this.Apollo
      .mutate({
        mutation: login,
        variables: {
          password: password,
          email: email,
          remember: false,
          is_staff: is_staff

        }
      });
  }
  register(email, name, username, honor_code, terms_of_service, password, organization, mobile, confirmpassword, is_staff) {
    return this.Apollo
      .mutate({
        mutation: signin,
        variables: {
          email: email,
          name: name,
          username: username,
          honor_code: honor_code,
          terms_of_service: terms_of_service,
          password: password,
          organization: organization,
          mobile: mobile,
          confirmpassword: confirmpassword,
          is_staff: is_staff
        }
      });
  }

  admin_dashboard(is_staff) {
    return this.Apollo
      .mutate({
        mutation: admin_dashboard,
        variables: {
          is_staff: is_staff
        }
      });
  }

  logout() {
    // remove user from local storage and set current user to null - confirmpassword
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  forgetPassword(email, name, is_staff) {
    return this.Apollo
      .mutate({
        mutation: resetpassword,
        variables: {
          email: email,
          name: name,
          is_staff: is_staff
        }
      });
  }

  confirmPassword(email, password) {
    return this.Apollo
      .mutate({
        mutation: confirmpassword,
        variables: {
          email: email,
          password: password
        }
      });
  }

  checklinkstatus(email) {
    return this.Apollo
      .mutate({
        mutation: checklinkstatus,
        variables: {
          email: email
        }
      });
  }
  courseView(user_id) {
    console.log(user_id, 'coming in service file')
    return this.Apollo
      .query({
        query: courseView,
        variables: {
          user_id: user_id
        }
      });
  }

  courseCreate(course_name, course_description, user_id, course_image, course_video, course_docs,
    org,number,run) {
    console.log(user_id, 'coming in service file')
    return this.Apollo
      .mutate({
        mutation: coursecreation,
        variables: {
          user_id: user_id,
          course_description: course_description,
          course_name: course_name,
          course_image: course_image,
          course_video: course_video,
          course_docs: course_docs,
          org : org,
          number :number,
          run : run
        }
      });
  }
}
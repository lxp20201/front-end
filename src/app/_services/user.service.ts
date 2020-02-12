import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/users`);
    }

    // register(user) {
    //     return this.http.post(`http://18.218.96.173:8082/user_api/v1/account/registration/`, user);
    // }
    verifyemail(data){
        return this.http.post(`http://18.218.96.173/v2/verifyemail`, data);
    }

    checkProfile(email){
        return this.http.get(`http://18.218.96.173/v2/getuserdetails?email=`+email);
    }
    

    delete(id) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}
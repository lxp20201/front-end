import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/users`);
    }

    register(user) {
        return this.http.post(`http://192.168.0.74:8080/user_api/v1/account/registration/`, user);
    }
    verifyemail(data){
        return this.http.post(`http://192.168.0.74:3001/verifyemail`, data);
    }
    

    delete(id) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}
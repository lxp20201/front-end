import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { environment } from '@environments/environment';
import { updateUser,verifymail } from '../operations/mutation';
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private Apollo :Apollo,) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/users`);
    }
    
    delete(id) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }

    updateProfileStatus(email,id) {
        return this.Apollo
          .mutate({
            mutation: updateUser,
            variables: {
                email: email,
                _id: id,
            }
          });
      }

      verifyemail(email,id,name,is_staff) {
        return this.Apollo
          .mutate({
            mutation:verifymail,
            variables: {
                email:email,
                _id:id,
                name : name,
                is_staff : is_staff
            }
          });
      }   
}
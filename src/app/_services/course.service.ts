

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class courseCreaterService {
    constructor(private http: HttpClient) { }

    getCourse(){
        return this.http.get(`https://jsonplaceholder.typicode.com/photos`);
    }
}
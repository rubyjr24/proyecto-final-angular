import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/i-user';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private endpoint = 'http://localhost:3000/users';

    constructor(private http: HttpClient){}

    getUsers(): Observable<IUser[]>{
        return this.http.get<IUser[]>(this.endpoint);
    }

}

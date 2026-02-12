import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

    validUser(username: string, password: string): Observable<boolean> {
        return this.http.get<IUser[]>(this.endpoint).pipe(
            map(users => users.some(user => 
                user.username === username && user.password === password
            ))
        );
    }

}

import { Injectable } from '@angular/core';
import { UserService } from './user-service';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private userService: UserService){}
  
  public checkLocalCredentials() : Observable<boolean>{
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    return this.userService.validUser(username!, password!);
  }

}

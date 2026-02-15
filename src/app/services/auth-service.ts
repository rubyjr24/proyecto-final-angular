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

  public getRole() : Observable<string | null>{
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    return this.userService.getRole(username!, password!);
  }

  public saveInLocalStorage(username: string, password: string){
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }

  public clearCredentialsInLocalStorage(){
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

}

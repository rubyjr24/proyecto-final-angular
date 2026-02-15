import { Injectable } from '@angular/core';
import { UserService } from './user-service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  private isChefSubject = new BehaviorSubject<boolean>(false);
  isChef$ = this.isChefSubject.asObservable();  
  
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
    this.loggedInSubject.next(true);
    this.userService.getRole(username!, password!).subscribe(
      role => this.isChefSubject.next(role === 'chef')
    )
  }

  public clearCredentialsInLocalStorage(){
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.loggedInSubject.next(false);
    this.isChefSubject.next(false);
  }

}

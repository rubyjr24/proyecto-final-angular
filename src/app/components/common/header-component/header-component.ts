import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'header-component',
  imports: [AsyncPipe],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  private isChefSubject = new BehaviorSubject<boolean>(false);
  isChef$ = this.isChefSubject.asObservable();    

  constructor(private auth: AuthService){}

  ngOnInit(){
    this.auth.checkLocalCredentials().subscribe(
      isLoggedIn => this.loggedInSubject.next(isLoggedIn)
    );

    this.auth.getRole().subscribe(
      role => {
        this.isChefSubject.next(role === 'chef');
      }
    )
  }

  logout(){
    this.auth.clearCredentialsInLocalStorage();
  }

}

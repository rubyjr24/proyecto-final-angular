import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'header-component',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {

  isLoggedIn$: Observable<boolean>;
  isChef$: Observable<boolean>;
  
  constructor(private auth: AuthService){
    this.isChef$ = this.auth.isChef$;
    this.isLoggedIn$ = this.auth.loggedIn$;
  }

  logout(){
    this.auth.clearCredentialsInLocalStorage();
  }

}

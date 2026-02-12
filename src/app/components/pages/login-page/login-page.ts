import { Component } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { IUser } from '../../../interfaces/i-user';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'login-page',
    imports: [ReactiveFormsModule],
    templateUrl: './login-page.html',
    styleUrl: './login-page.css',
})
export class LoginPage {

    private userSubject: Subject<IUser> = new Subject<IUser>();
    user$: Observable<IUser> = this.userSubject.asObservable();

    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private userService: UserService, private router: Router) {}

    public login(event:Event) {
        event.preventDefault();
        this.userService.validUser(
            this.loginForm.value.username!, 
            this.loginForm.value.password!
        ).subscribe(
            isValid => isValid ? this.onIsValid() : null 
        )

    }

    private onIsValid(){
        cookieStore.set('username', this.loginForm.value.username!);
        cookieStore.set('password', this.loginForm.value.password!);
        this.router.navigate(['/home']);
    }

}

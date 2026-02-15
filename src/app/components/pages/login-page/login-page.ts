import { Component } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { IUser } from '../../../interfaces/i-user';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { ToastService } from '../../../services/toast-service';

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

    private toastSubject = new Subject<string>();
    toastMessage: string = '';

    constructor(private userService: UserService, private auth: AuthService, private location: Location, private toast: ToastService) {
         this.toastSubject.subscribe(message => {
            this.toastMessage = message;

            setTimeout(() => this.toastMessage = '', 3000);
            });
    }

    public login(event:Event) {
        event.preventDefault();
        this.userService.validUser(
            this.loginForm.value.username!, 
            this.loginForm.value.password!
        ).subscribe(
            isValid => {
                if (isValid){
                    this.auth.saveInLocalStorage(
                        this.loginForm.value.username!, 
                        this.loginForm.value.password!
                    );
                    this.location.back();
                }else{
                    this.toast.show('El usuario o la constaseña no son válidos');
                }
            }
        )

    }


}

import { Component } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { IUser } from '../../../interfaces/i-user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
    selector: 'login-page',
    imports: [],
    templateUrl: './login-page.html',
    styleUrl: './login-page.css',
})
export class LoginPage {

    private userSubject: Subject<IUser> = new Subject<IUser>();
    user$: Observable<IUser> = this.userSubject.asObservable();

    constructor(private userService: UserService) {
        this.userService.getUsers().subscribe(
            users => {
                const filtered = users.filter(user => user.username === 'user1');
                if (filtered.length !== 1) return;
                this.userSubject.next(filtered[0]);
            }
        )
    }

}

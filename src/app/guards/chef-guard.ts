import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChefGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.getRole().pipe(
      map(role => {
        if (role !== 'chef') {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
}

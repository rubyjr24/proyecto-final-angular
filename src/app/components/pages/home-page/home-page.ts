import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

  constructor(private authService: AuthService){
    
  }

}

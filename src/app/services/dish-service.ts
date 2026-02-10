import { Injectable } from '@angular/core';
import { IDish } from '../interfaces/i-dish';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DishService {

    private endpoint = "http://localhost:3000/dishes";

    constructor(private http: HttpClient){}

    getDishes() : Observable<IDish[]>{
        return this.http.get<IDish[]>(this.endpoint);
    }
}

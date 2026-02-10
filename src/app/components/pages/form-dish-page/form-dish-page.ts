import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDish } from '../../../interfaces/i-dish';
import { DishService } from '../../../services/dish-service';
import { DishListComponent } from '../../common/dish-list-component/dish-list-component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'form-dish-page',
    imports: [DishListComponent, AsyncPipe],
    templateUrl: './form-dish-page.html',
    styleUrl: './form-dish-page.css',
})
export class FormDishPage {

    private dishesSubject = new BehaviorSubject<IDish[]>([]);
    dishes$: Observable<IDish[]> = this.dishesSubject.asObservable();

    constructor(private dishService: DishService) {
        this.dishService.getDishes().subscribe(
            dishes => this.dishesSubject.next(dishes)
        );
    }

}

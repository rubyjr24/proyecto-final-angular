import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDish } from '../../../interfaces/i-dish';
import { DishService } from '../../../services/dish-service';
import { AsyncPipe } from '@angular/common';
import { DishListComponent } from '../../common/dish-list-component/dish-list-component';
import { AccesibilityMenuComponent } from '../../common/accesibility-menu-component/accesibility-menu-component';

@Component({
	selector: 'menu-page',
	imports: [DishListComponent, AsyncPipe, AccesibilityMenuComponent],
	templateUrl: './menu-page.html',
	styleUrl: './menu-page.css',
})
export class MenuPage {

	private dishesSubject = new BehaviorSubject<IDish[]>([]);
	dishes$: Observable<IDish[]> = this.dishesSubject.asObservable();

	constructor(private dishService: DishService) {
		this.dishService.getDishes().subscribe(
			dishes => this.dishesSubject.next(dishes.filter(dish => dish.enabled))
		);
	}

}

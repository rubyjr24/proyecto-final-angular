import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDish } from '../../../interfaces/i-dish';
import { DishService } from '../../../services/dish-service';
import { DishListComponent } from '../../common/dish-list-component/dish-list-component';
import { AsyncPipe } from '@angular/common';
import { DishFormComponent } from "../../common/dish-form-component/dish-form-component";

@Component({
    selector: 'form-dish-page',
    imports: [DishListComponent, AsyncPipe, DishFormComponent],
    templateUrl: './form-dish-page.html',
    styleUrl: './form-dish-page.css',
})
export class FormDishPage {

    private dishesSubject = new BehaviorSubject<IDish[]>([]);
    dishes$: Observable<IDish[]> = this.dishesSubject.asObservable();

    dish?: IDish;

    @Output() newDishEmitter = new EventEmitter();
    @Output() updateDishEmitter = new EventEmitter();
    @Output() editDishEmitter = new EventEmitter<IDish>();
    @Output() deleteDishEmitter = new EventEmitter<IDish>();
    @Output() disableableDishEmitter = new EventEmitter<IDish>();
    
    constructor(private dishService: DishService) {
        this.dishService.getDishes().subscribe(
            dishes => this.dishesSubject.next(dishes)
        );

        this.deleteDishEmitter.subscribe(this.onDelete.bind(this));
        this.editDishEmitter.subscribe(this.onEdit.bind(this));
        this.disableableDishEmitter.subscribe(this.onDisable.bind(this));
    }

    addNewDish(dish: IDish){
        this.dishesSubject.next([...this.dishesSubject.value, dish]);
    }

    updateDish(dish: IDish){
        const dishes = this.dishesSubject.value.map(
            dishInList => dishInList.id === dish.id ? dish : dishInList
        )

        this.dishesSubject.next(dishes);
    }

    onEdit(dish: IDish){
        this.dish = dish;
    }

    onDelete(dish: IDish){
        this.dishService.deleteDish(dish.id!)
            .subscribe({
                next: () => {
                    this.dishesSubject.next(this.dishesSubject.value.filter((d) => d.id !== dish.id));
                }
            });
    }

    onDisable(dish: IDish){
        this.dishService.editDish(dish).subscribe();
    }

}

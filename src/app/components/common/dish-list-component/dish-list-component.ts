import { Component, Input } from '@angular/core';
import { IDish } from '../../../interfaces/i-dish';
import { DishCardComponent } from '../dish-card-component/dish-card-component';

@Component({
    selector: 'dish-list-component',
    imports: [DishCardComponent],
    templateUrl: './dish-list-component.html',
    styleUrl: './dish-list-component.css',
})
export class DishListComponent {
    @Input() dishes!: IDish[];
    @Input() editable: boolean = false;
    @Input() deleteable: boolean = false;
    @Input() disableable: boolean = false;
}

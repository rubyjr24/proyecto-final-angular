import { Component, EventEmitter, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IDish } from '../../../interfaces/i-dish';

@Component({
  selector: 'dish-card-component',
  imports: [CurrencyPipe],
  templateUrl: './dish-card-component.html',
  styleUrl: './dish-card-component.css',
})
export class DishCardComponent {

  @Input() dish!: IDish;

  @Input() editDishEmitter?: EventEmitter<IDish>;
  @Input() deleteDishEmitter?: EventEmitter<IDish>;
  @Input() disableableDishEmitter?: EventEmitter<IDish>;

}

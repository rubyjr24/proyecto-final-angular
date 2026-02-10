import { Component, Input } from '@angular/core';
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
  @Input() editable: boolean = false;
  @Input() deleteable: boolean = false;
  @Input() disableable: boolean = false;
}

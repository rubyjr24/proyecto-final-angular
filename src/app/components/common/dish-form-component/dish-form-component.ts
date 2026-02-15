import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DishService } from '../../../services/dish-service';
import { IDish } from '../../../interfaces/i-dish';
import { DishType, DishTypeLabel } from '../../../enums/dish-type';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'dish-form-component',
  imports: [FormsModule, NgStyle],
  templateUrl: './dish-form-component.html',
  styleUrl: './dish-form-component.css',
})
export class DishFormComponent {

  imageLoaded = false;

  @Input() dish!: IDish;

  dishTypes:DishType[] = Object.values(DishType);
  dishTypeLabels = DishTypeLabel;

  @Input() updateableDish?: IDish;

  @Output() newDishEmitter = new EventEmitter<IDish>();
  @Output() updateableDishEmitter = new EventEmitter<IDish>();

  constructor(private dishService: DishService) { }

  ngOnInit(){
    if(this.updateableDish) this.dish = this.updateableDish;
    else this.resetDish();
    this.imageLoaded = this.dish?.image ? true : false;
  }

  ngOnChanges(){
    if(this.updateableDish) this.dish = this.updateableDish;
    this.imageLoaded = this.dish?.image ? true : false;
  }
  
  addDish() {

    if (this.updateableDish){
      this.dishService.editDish(this.dish)
      .subscribe({
        next: (dish) => this.updateableDishEmitter.next(dish)
      });

    }else{
      this.dishService.addDish(this.dish)
      .subscribe({
        next: (dish) => this.newDishEmitter.next(dish)
      });
    }

    
    
    this.resetDish();
    this.imageLoaded = false;
  }

  changeImage(fileInput: HTMLInputElement) {

    if (!fileInput.files || fileInput.files.length === 0) { return; }
    this.imageLoaded = false;

    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);

    reader.addEventListener('loadend', e => {
      if (typeof reader.result !== 'string') return;

      this.dish.image = reader.result;
      this.imageLoaded = true;
    });
  }

  resetDish(){
    this.dish = {
      id: undefined,
      name: '',
      description: '',
      price: 0,
      catergory: DishType.MainCourse,
      image: '',
      enabled: false
    };
  }

}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDishPage } from './form-dish-page';

describe('FormDishPage', () => {
  let component: FormDishPage;
  let fixture: ComponentFixture<FormDishPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDishPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDishPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

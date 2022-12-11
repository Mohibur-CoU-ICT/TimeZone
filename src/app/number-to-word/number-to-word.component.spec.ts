import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberToWordComponent } from './number-to-word.component';

describe('NumberToWordComponent', () => {
  let component: NumberToWordComponent;
  let fixture: ComponentFixture<NumberToWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberToWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberToWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRepasComponent } from './create-repas.component';

describe('CreateRepasComponent', () => {
  let component: CreateRepasComponent;
  let fixture: ComponentFixture<CreateRepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRepasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

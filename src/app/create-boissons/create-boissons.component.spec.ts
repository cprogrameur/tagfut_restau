import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoissonsComponent } from './create-boissons.component';

describe('CreateBoissonsComponent', () => {
  let component: CreateBoissonsComponent;
  let fixture: ComponentFixture<CreateBoissonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBoissonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBoissonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

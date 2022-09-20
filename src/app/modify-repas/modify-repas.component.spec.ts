import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRepasComponent } from './modify-repas.component';

describe('ModifyRepasComponent', () => {
  let component: ModifyRepasComponent;
  let fixture: ComponentFixture<ModifyRepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyRepasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyRepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

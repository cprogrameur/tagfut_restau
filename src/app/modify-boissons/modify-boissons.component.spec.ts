import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBoissonsComponent } from './modify-boissons.component';

describe('ModifyBoissonsComponent', () => {
  let component: ModifyBoissonsComponent;
  let fixture: ComponentFixture<ModifyBoissonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyBoissonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyBoissonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

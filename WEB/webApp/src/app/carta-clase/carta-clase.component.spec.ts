import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaClaseComponent } from './carta-clase.component';

describe('CartaClaseComponent', () => {
  let component: CartaClaseComponent;
  let fixture: ComponentFixture<CartaClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaClaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

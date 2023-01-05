import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomComponenteComponent } from './room-componente.component';

describe('RoomComponenteComponent', () => {
  let component: RoomComponenteComponent;
  let fixture: ComponentFixture<RoomComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomComponenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

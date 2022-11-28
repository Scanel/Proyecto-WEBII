import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnirseRoomComponent } from './unirse-room.component';

describe('UnirseRoomComponent', () => {
  let component: UnirseRoomComponent;
  let fixture: ComponentFixture<UnirseRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnirseRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnirseRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

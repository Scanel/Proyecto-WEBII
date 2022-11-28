import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizarAvatarComponent } from './personalizar-avatar.component';

describe('PersonalizarAvatarComponent', () => {
  let component: PersonalizarAvatarComponent;
  let fixture: ComponentFixture<PersonalizarAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalizarAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalizarAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

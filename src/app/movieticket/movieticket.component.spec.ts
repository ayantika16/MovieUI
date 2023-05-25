import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieticketComponent } from './movieticket.component';

describe('MovieticketComponent', () => {
  let component: MovieticketComponent;
  let fixture: ComponentFixture<MovieticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieticketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

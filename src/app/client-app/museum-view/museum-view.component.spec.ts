import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseumViewComponent } from './museum-view.component';

describe('MuseumViewComponent', () => {
  let component: MuseumViewComponent;
  let fixture: ComponentFixture<MuseumViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuseumViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuseumViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

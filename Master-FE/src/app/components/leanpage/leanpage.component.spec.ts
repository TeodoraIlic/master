import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeanpageComponent } from './leanpage.component';

describe('LeanpageComponent', () => {
  let component: LeanpageComponent;
  let fixture: ComponentFixture<LeanpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeanpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeanpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

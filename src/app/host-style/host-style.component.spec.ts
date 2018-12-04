import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostStyleComponent } from './host-style.component';

describe('HostStyleComponent', () => {
  let component: HostStyleComponent;
  let fixture: ComponentFixture<HostStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

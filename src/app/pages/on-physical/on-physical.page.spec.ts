import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnPhysicalPage } from './on-physical.page';

describe('OnPhysicalPage', () => {
  let component: OnPhysicalPage;
  let fixture: ComponentFixture<OnPhysicalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnPhysicalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnPhysicalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

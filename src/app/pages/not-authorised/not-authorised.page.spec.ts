import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthorisedPage } from './not-authorised.page';

describe('NotAuthorisedPage', () => {
  let component: NotAuthorisedPage;
  let fixture: ComponentFixture<NotAuthorisedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotAuthorisedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAuthorisedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

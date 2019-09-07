import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuetionarePage } from './quetionare.page';

describe('QuetionarePage', () => {
  let component: QuetionarePage;
  let fixture: ComponentFixture<QuetionarePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuetionarePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuetionarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

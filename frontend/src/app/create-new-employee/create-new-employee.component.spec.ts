import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewEmployeeComponent } from './create-new-employee.component';
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";

describe('CreateNewEmployeeComponent', () => {
  let component: CreateNewEmployeeComponent;
  let fixture: ComponentFixture<CreateNewEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatOptionModule ],
      declarations: [ CreateNewEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

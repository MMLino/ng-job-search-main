import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobElementListComponent } from './job-element-list.component';

describe('JobElementListComponent', () => {
  let component: JobElementListComponent;
  let fixture: ComponentFixture<JobElementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobElementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobElementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

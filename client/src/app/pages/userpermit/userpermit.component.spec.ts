import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpermitComponent } from './userpermit.component';

describe('UserpermitComponent', () => {
  let component: UserpermitComponent;
  let fixture: ComponentFixture<UserpermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserpermitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserpermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

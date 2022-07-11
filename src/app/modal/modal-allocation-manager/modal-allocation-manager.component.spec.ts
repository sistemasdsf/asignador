import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAllocationManagerComponent } from './modal-allocation-manager.component';

describe('ModalAllocationManagerComponent', () => {
  let component: ModalAllocationManagerComponent;
  let fixture: ComponentFixture<ModalAllocationManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAllocationManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAllocationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

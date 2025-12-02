import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditoForm } from './credito-form';

describe('CreditoForm', () => {
  let component: CreditoForm;
  let fixture: ComponentFixture<CreditoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

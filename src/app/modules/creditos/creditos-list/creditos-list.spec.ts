import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosList } from './creditos-list';

describe('CreditosList', () => {
  let component: CreditosList;
  let fixture: ComponentFixture<CreditosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

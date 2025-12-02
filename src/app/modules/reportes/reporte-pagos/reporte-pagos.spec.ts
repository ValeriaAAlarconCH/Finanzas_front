import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePagos } from './reporte-pagos';

describe('ReportePagos', () => {
  let component: ReportePagos;
  let fixture: ComponentFixture<ReportePagos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportePagos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportePagos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

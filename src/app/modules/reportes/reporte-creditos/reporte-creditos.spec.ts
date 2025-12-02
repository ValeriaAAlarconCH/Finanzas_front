import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCreditos } from './reporte-creditos';

describe('ReporteCreditos', () => {
  let component: ReporteCreditos;
  let fixture: ComponentFixture<ReporteCreditos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteCreditos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteCreditos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

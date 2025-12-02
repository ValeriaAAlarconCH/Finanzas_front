import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionMain } from './configuracion-main';

describe('ConfiguracionMain', () => {
  let component: ConfiguracionMain;
  let fixture: ComponentFixture<ConfiguracionMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracionMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionMain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

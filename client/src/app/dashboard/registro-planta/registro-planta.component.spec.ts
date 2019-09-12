import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPlantaComponent } from './registro-planta.component';

describe('RegistroPlantaComponent', () => {
  let component: RegistroPlantaComponent;
  let fixture: ComponentFixture<RegistroPlantaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPlantaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NiveisEnsinoComponent} from './niveis-ensino.component';

describe('NiveisEnsinoComponent', () => {
  let component: NiveisEnsinoComponent;
  let fixture: ComponentFixture<NiveisEnsinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiveisEnsinoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiveisEnsinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

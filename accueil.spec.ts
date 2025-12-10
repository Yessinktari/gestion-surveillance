import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Accueil } from './accueil';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnseignantService } from '../Services/enseignant-service';

describe('Accueil', () => {
  let component: Accueil;
  let fixture: ComponentFixture<Accueil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accueil, HttpClientTestingModule], // <- Accueil si standalone
      providers: [EnseignantService]
    }).compileComponents();

    fixture = TestBed.createComponent(Accueil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

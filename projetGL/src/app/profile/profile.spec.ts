import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Profile } from './profile';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnseignantService } from '../Services/enseignant-service';

describe('Profile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile, HttpClientTestingModule], // <- Profile ici si standalone
      providers: [EnseignantService] // <- tous les services injectés
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

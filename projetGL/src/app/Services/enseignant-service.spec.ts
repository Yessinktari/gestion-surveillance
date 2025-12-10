import { TestBed } from '@angular/core/testing';
import { EnseignantService } from './enseignant-service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // nécessaire si ton service utilise HttpClient

describe('EnseignantService', () => {
  let service: EnseignantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] // <- ajoute ce module
    });
    service = TestBed.inject(EnseignantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

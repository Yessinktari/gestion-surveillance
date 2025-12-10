import { TestBed } from '@angular/core/testing';
import { MatiereService } from './matiere-service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // <- requis si service utilise HttpClient

describe('MatiereService', () => {
  let service: MatiereService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] // <- indispensable
    });
    service = TestBed.inject(MatiereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

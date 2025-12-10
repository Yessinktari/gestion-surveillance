import { TestBed } from '@angular/core/testing';
import { SeanceService } from './seance-service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // <- requis si HttpClient est utilisé

describe('SeanceService', () => {
  let service: SeanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] // <- indispensable
    });
    service = TestBed.inject(SeanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

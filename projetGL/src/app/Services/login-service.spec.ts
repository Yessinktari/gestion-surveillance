import { TestBed } from '@angular/core/testing';
import { LoginService } from './login-service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // pour HttpClient

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] // <- indispensable si le service utilise HttpClient
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ResolveRegistrosService } from './resolve-registros.service';

describe('ResolveRegistrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResolveRegistrosService = TestBed.get(ResolveRegistrosService);
    expect(service).toBeTruthy();
  });
});

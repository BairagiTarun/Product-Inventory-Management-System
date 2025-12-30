import { TestBed } from '@angular/core/testing';

import { ProductServices } from './productServices';

describe('ProductServices', () => {
  let service: ProductServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

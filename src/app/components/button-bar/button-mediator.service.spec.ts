import { TestBed } from '@angular/core/testing';

import { ButtonMediatorService } from './button-mediator.service';

describe('ButtonMediatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ButtonMediatorService = TestBed.get(ButtonMediatorService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AddEditPatientService } from './add-edit-patient.service';

describe('AddEditPatientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddEditPatientService = TestBed.get(AddEditPatientService);
    expect(service).toBeTruthy();
  });
});

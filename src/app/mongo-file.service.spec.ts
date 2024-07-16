import { TestBed } from '@angular/core/testing';

import { MongoFileService } from './mongo-file.service';

describe('MongoFileService', () => {
  let service: MongoFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MongoFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

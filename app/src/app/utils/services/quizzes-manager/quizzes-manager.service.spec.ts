import { TestBed } from '@angular/core/testing';

import { QuizzesManagerService } from './quizzes-manager.service';

describe('QuizzesManagerService', () => {
  let service: QuizzesManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizzesManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

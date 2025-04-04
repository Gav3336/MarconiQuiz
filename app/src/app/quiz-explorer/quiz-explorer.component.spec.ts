import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizExplorerComponent } from './quiz-explorer.component';

describe('QuizExplorerComponent', () => {
  let component: QuizExplorerComponent;
  let fixture: ComponentFixture<QuizExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizExplorerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

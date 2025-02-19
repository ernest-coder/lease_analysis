import { Component } from '@angular/core';
import { Question } from 'src/app/shared/models/question.models';
import { AlertToastService } from 'src/app/shared/services/alert-toast.service';
import { QuestionService } from 'src/app/shared/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss'
})
export class QuestionListComponent {
  questions: Question[] | undefined;
  isLoading: boolean = false;

  constructor(
    private questionService: QuestionService,
    private alertToastService: AlertToastService
  ) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.isLoading = true;
    this.questionService.getAllQuestions().subscribe(
      data => {
        console.log(data)
        this.questions = data;
        this.isLoading = false;
      },
      error => {
        
        this.alertToastService.error('Error loading questions');
        this.isLoading = false;
      }
    );
  }
  
}

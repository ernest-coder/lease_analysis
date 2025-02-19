import { Component, Input } from '@angular/core';
import { Question } from 'src/app/shared/models/question.models';
import { Template } from 'src/app/shared/models/template.models';
import { AlertToastService } from 'src/app/shared/services/alert-toast.service';
import { TemplateService } from 'src/app/shared/services/template.service';

@Component({
  selector: 'app-template-item',
  templateUrl: './template-item.component.html',
  styleUrls: ['./template-item.component.scss']
})
export class TemplateItemComponent {
  isLoading: boolean = false;
  questions: Question[] | undefined;
  showQuestions: boolean = false;
  questionsByCategory: { [key: string]: Question[] } = {};
  categories: string[] = [];

  @Input() template: Template | undefined;

  constructor(
    private templateService: TemplateService,
    private alertToastService: AlertToastService
  ) { }

  toggleQuestions(): void {
    this.showQuestions = !this.showQuestions;
    if (this.showQuestions && !this.questions) {
      this.loadQuestionsByTemplateId(this.template!);
    }
  }

  loadQuestionsByTemplateId(template: Template): void {
    if (!template) return;

    this.isLoading = true;
    this.templateService.getQuestionsByTemplateId(template.id).subscribe(
      data => {
        this.questions = data;
        this.questionsByCategory = this.groupQuestionsByCategory(this.questions);
        this.categories = Object.keys(this.questionsByCategory);
        this.isLoading = false;
      },
      error => {
        this.alertToastService.error('Error fetching questions:', error);
        this.isLoading = false;
      }
    );
  }

  groupQuestionsByCategory(questions: Question[]): { [key: string]: Question[] } {
    return questions.reduce((acc, question) => {
      if (!acc[question.category]) {
        acc[question.category] = [];
      }
      acc[question.category].push(question);
      return acc;
    }, {} as { [key: string]: Question[] });
  }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LeaseAnalysis } from 'src/app/shared/models/lease-analysis.model';
import { Question } from 'src/app/shared/models/question.models';
import { Template } from 'src/app/shared/models/template.models';
import { AlertToastService } from 'src/app/shared/services/alert-toast.service';
import { LeaseAnalysisService } from 'src/app/shared/services/lease-analysis.service';
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
  @Input() leaseAnalysis: LeaseAnalysis | undefined;

  constructor(
    private templateService: TemplateService,
    private alertToastService: AlertToastService,
    private router: Router,
    private leaseAnalysisService: LeaseAnalysisService,
    private translateService: TranslateService
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
        const message = this.translateService.instant('question.retrieve.error');
        this.alertToastService.error(message);
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

  selectTemplate($event: Event): void {
    $event.stopPropagation();
    if (!this.leaseAnalysis) {
      const message_no_lease_analysis = this.translateService.instant('lease_analysis.retrieve.no_leases');
      this.alertToastService.error(message_no_lease_analysis);
      return;
    }
    if (!this.template) {
      const message_no_template = this.translateService.instant('template.no_template');
      this.alertToastService.error(message_no_template);
      return;
    }
    this.leaseAnalysisService.setTemplateId(this.leaseAnalysis.id, this.template.id).subscribe({
      next: (updatedLeaseAnalysis: LeaseAnalysis) => {
      },
      error: (error) => {
        const message = this.translateService.instant('lease_analysis.update.error');
        this.alertToastService.error(message);
      }
    });
    this.router.navigate([`/analyze/${this.leaseAnalysis.id}`]);
  }
}

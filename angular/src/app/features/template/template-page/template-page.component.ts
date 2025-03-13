import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LeaseAnalysis } from 'src/app/shared/models/lease-analysis.model';
import { Question } from 'src/app/shared/models/question.models';
import { Template } from 'src/app/shared/models/template.models';
import { AlertToastService } from 'src/app/shared/services/alert-toast.service';
import { LeaseAnalysisService } from 'src/app/shared/services/lease-analysis.service';
import { TemplateService } from 'src/app/shared/services/template.service';

@Component({
  selector: 'app-template-page',
  templateUrl: './template-page.component.html',
  styleUrl: './template-page.component.scss'
})
export class TemplatePageComponent implements OnInit {

  templates: Template[] | undefined;
  questions: Question[] | undefined;
  isLoading: boolean = false;
  leaseAnalysis: LeaseAnalysis | undefined;

  constructor(
    private templateService: TemplateService,
    private alertToastService: AlertToastService,
    private route: ActivatedRoute,
    private leaseAnalysisService: LeaseAnalysisService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getLeaseAnalysis();
    this.loadTemplates();
  }
  
  getLeaseAnalysis(): void {
    const leaseAnalysisId = this.route.snapshot.paramMap.get('id')!;
    this.leaseAnalysisService.getLeaseAnalysisById(Number(leaseAnalysisId)).subscribe({
      next: (leaseAnalysis: LeaseAnalysis) => {
        this.leaseAnalysis = leaseAnalysis;
      },
      error: (error) => {
        const message = this.translateService.instant('lease_analysis.update.create_error');
        this.alertToastService.error(message);
      }
    });
  }


  loadTemplates(): void {
    this.isLoading = true;
    this.templateService.getAllTemplates().subscribe(
      data => {
        this.templates = data;
        this.isLoading = false;
      },
      error => {
        const message = this.translateService.instant('template.retrieve_error');
        this.alertToastService.error(message);
        this.isLoading = false;
      }
    );
  }

  loadQuestionsByTemplateId(template:Template): void {
    this.isLoading = true;
    this.templateService.getQuestionsByTemplateId(template.id).subscribe(
      data => {
        this.questions = data;
        this.isLoading = false;
      },
      error => {
        const message = this.translateService.instant('question.retrieve.error');
        this.alertToastService.error(message);
        this.isLoading = false;
      }
    );
  }
}

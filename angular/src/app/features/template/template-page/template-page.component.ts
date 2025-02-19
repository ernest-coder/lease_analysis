import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/models/question.models';
import { Template } from 'src/app/shared/models/template.models';
import { AlertToastService } from 'src/app/shared/services/alert-toast.service';
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

  constructor(
    private templateService: TemplateService,
    private alertToastService: AlertToastService
  ) { }

  ngOnInit(): void {
    this.loadTemplates();
  }


  loadTemplates(): void {
    this.isLoading = true;
    this.templateService.getAllTemplates().subscribe(
      data => {
        this.templates = data;
        this.isLoading = false;
      },
      error => {
        this.alertToastService.error('Error loading questions');
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
        console.error('Error fetching questions:', error);
        this.isLoading = false;
      }
    );
  }
}

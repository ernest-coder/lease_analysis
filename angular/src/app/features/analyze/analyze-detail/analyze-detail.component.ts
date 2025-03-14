import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LeaseAnalysis } from 'src/app/shared/models/lease-analysis.model';
import { AlertToastService } from 'src/app/shared/services/alert-toast.service';
import { AnalyzeService } from 'src/app/shared/services/analyze.service';

@Component({
  selector: 'app-analyze-detail',
  templateUrl: './analyze-detail.component.html',
  styleUrl: './analyze-detail.component.scss'
})
export class AnalyzeDetailComponent implements OnInit {

  loading: boolean = true

  @Input() leaseAnalysis: LeaseAnalysis | undefined

  constructor(
    private analyzeService: AnalyzeService,
    private translateService: TranslateService,
    private alertToastService: AlertToastService
  ) {}

  ngOnInit(): void {
    this.analyzeLease()
  }

  analyzeLease(): void {
    if (this.leaseAnalysis) {
      this.analyzeService.analyzeLease(this.leaseAnalysis).subscribe({
        next: (leaseAnalysis: LeaseAnalysis) => {
          this.leaseAnalysis = leaseAnalysis
          this.loading = false
        },
        error: (error) => {
          this.loading = false
          console.error(error)
          const message = this.translateService.instant('analyze.error');
          this.alertToastService.error(message);
        }
      })
    }
  }

}

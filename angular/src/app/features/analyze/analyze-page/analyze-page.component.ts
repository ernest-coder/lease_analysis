import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LeaseAnalysis } from 'src/app/shared/models/lease-analysis.model';
import { AlertToastService } from 'src/app/shared/services/alert-toast.service';
import { LeaseAnalysisService } from 'src/app/shared/services/lease-analysis.service';
import { StorageService } from 'src/app/shared/services/storage.service';

type FileType = 'pdf' | 'unknown';

@Component({
  selector: 'app-analyze-page',
  templateUrl: './analyze-page.component.html',
  styleUrl: './analyze-page.component.scss'
})

export class AnalyzePageComponent {

  constructor(
    private alertToastService: AlertToastService,
    private route: ActivatedRoute,
    private leaseAnalysisService: LeaseAnalysisService,
    private translateService: TranslateService,
    private storageService: StorageService
  ) {}
  
  fileUrl: string | undefined
  leaseAnalysis: LeaseAnalysis | undefined;

  ngOnInit(): void {
    this.getLeaseAnalysis();
  }


  getLeaseAnalysis(): void {
    const leaseAnalysisId = this.route.snapshot.paramMap.get('id')!;
    this.leaseAnalysisService.getLeaseAnalysisById(Number(leaseAnalysisId)).subscribe({
      next: (leaseAnalysis: LeaseAnalysis) => {
        this.leaseAnalysis = leaseAnalysis;
        this.showFile();
      },
      error: (error) => {
        const message = this.translateService.instant('lease_analysis.update.create_error');
        this.alertToastService.error(message);
      }
    });
  }

  showFile() {
    if (this.leaseAnalysis) {
      this.storageService.generateSignedUrl('input', this.leaseAnalysis.file).subscribe({
        next: (signedUrl: string) => {
          this.fileUrl = signedUrl
          console.log(signedUrl)
        },
        error: (error) => {
          const message = this.translateService.instant('storage.generate_url_error');
          this.alertToastService.error(message);
        }
      });
    }
    
  }
}

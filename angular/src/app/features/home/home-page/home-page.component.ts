import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, from, Subject, takeUntil } from 'rxjs';
import { AlertToastService } from 'src/app/shared/services/alert-toast.service';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  formGroup: FormGroup;
  isLoading: boolean = false;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private translateService: TranslateService,
    private alertToastService: AlertToastService,
    private router: Router,
  ) {
    this.formGroup = this.fb.group({
      file: [null, Validators.required],
    });
  }

  onFileSelected(file: File): void {
    this.formGroup.patchValue({ file: file });
    this.formGroup.get('file')!.updateValueAndValidity();
    this.selectedFiles = [file];
    this.onSubmit();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      // Mark all fields as touched to show validation errors
      this.formGroup.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const lease_file = this.formGroup.get('file')!.value;

    this.uploadFile(lease_file);
  }


  uploadFile(file: File): void {
    const supabase = this.supabaseService.getClient();
    const filePath = `${file.name}`;

    const upload$ = from(supabase.storage.from('input').upload(filePath, file));

    upload$.pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        const message = this.translateService.instant('lease_import.create.error');
        this.alertToastService.error(message)
        this.isLoading = false;
        throw error;
      })
    ).subscribe(
      data => {
        const message = this.translateService.instant('lease_import.create.success');
        this.alertToastService.success(message)
        this.isLoading = false;
        this.router.navigate([`/templates/`]);
      },
      error => {
        const message = this.translateService.instant('lease_import.create.error');
        this.alertToastService.error(message)
        this.isLoading = false;
      }
    );
  }

  close(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

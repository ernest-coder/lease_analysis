import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {
  
  formGroup: FormGroup;
  isLoading: boolean = false;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
  ) {
    this.formGroup = this.fb.group({
      file: [null, Validators.required],
    });
  }

  onFileSelected(file: File): void {
    this.formGroup.patchValue({ file: file });
    this.formGroup.get('file')!.updateValueAndValidity();
    this.selectedFiles = [file];
  }
}

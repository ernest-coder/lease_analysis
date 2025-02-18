import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-upload-file-area',
  templateUrl: './upload-file-area.component.html'
})
export class UploadFileAreaComponent {

  @Input() index: number = 0; // Use this if you have multiple upload areas in the same page
  @Input() allowMultipleFiles: boolean = false; // If true, only one file can be uploaded at a time
  @Input() acceptType?: string; // Example: "audio/*"
  @Input() isUploading: boolean = false; // Show a loading spinner
  @Input() isDisabled: boolean = false; // Show a loading spinner
  @Input() dropZoneTitleKey?: string;
  @Input() dropZoneMessageKey!: string;
  @Input() errorMessageKey!: string;
  @Input() errorTitleKey!: string;
  @Input() selectedFiles: File[] = [];
  @Output() requestUploadFile = new EventEmitter<File>();
  @Output() requestUploadMultiFiles = new EventEmitter<File[]>();

  public isDragging: boolean = false;

  constructor(private dialog: MatDialog) {}

  submitFiles(event: Event) {
    const element = event.target as HTMLInputElement;
    let files: FileList | null = element.files;
    if (files) this.requestUploads(files);
  }

  requestUploads(files?: FileList): void {
    if (!files || files.length == 0)
      return

    let notSupportedFormat = false

    // Single file upload
    if (!this.allowMultipleFiles) {
      if (this.checkFileType(files[0]))
        this.requestUploadFile.emit(files[0])
      else
        notSupportedFormat = true
    }
    // Multiple file upload
    else {
      let compatibleFiles = Array.from(files).filter((file) => this.checkFileType(file))

      if (compatibleFiles.length > 0)
        this.requestUploadMultiFiles.emit(compatibleFiles)
      else
        notSupportedFormat = true
    }

    // Show error dialog if the file format is not supported
    if (notSupportedFormat)
      this.openFileFormatNotSupportedDialog()
  }

  private checkFileType(file: File): boolean {
    if (!this.acceptType) return true;
    const acceptedTypes = this.acceptType.split(',');
    return acceptedTypes.some(type => {
      // For general type like 'image/*'
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.split('/')[0]);
      }
      // For extension like '.png'
      if (type.startsWith('.')) {
        return file.name.endsWith(type.trim());
      }
      // For specific type like 'image/png'
      return file.type === type.trim();
    });
  }

  dragFileDrop($event: DragEvent) {
    $event.preventDefault()
    $event.stopPropagation()
    this.isDragging = false

    this.requestUploads($event.dataTransfer?.files)

  }

  dragFileOver($event: DragEvent) {
    $event.preventDefault()
    $event.stopPropagation()
    this.isDragging = true
  }

  dragFileLeave($event: DragEvent) {
    $event.preventDefault()
    $event.stopPropagation()
    this.isDragging = false
  }

  openFileFormatNotSupportedDialog(): void {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        titleKey: this.errorTitleKey,
        messageKey: this.errorMessageKey
      }
    })
  }
}

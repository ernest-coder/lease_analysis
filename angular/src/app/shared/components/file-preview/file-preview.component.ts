import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

type FileType = 'pdf' | 'image' | 'unknown';

const SUPPORTED_EXTENSIONS = [
    ".doc",
    ".docx",
    ".pdf",
];

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
})
export class FilePreviewComponent implements OnInit, OnChanges {

  @Input() fileUrl: string | undefined;
  @Input() fileName: string | undefined;
  @Input() page: number | null = null;
  @Output() fileIsSupported = new EventEmitter<boolean>();

  ngOnInit() {
    // This fix pdf-viewer not rendering correctly when the component first loads
    window.dispatchEvent(new Event('resize'));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fileUrl'] || changes['fileName']) {
      this.fileIsSupported.emit(this.getSourceType() !== 'unknown');
    }
  }

  getSourceType(): FileType {
    if (!this.fileUrl || !this.fileName) return 'unknown';

    const fileName = this.fileName.toLowerCase();

    if (SUPPORTED_EXTENSIONS.some(ext => fileName.endsWith(ext))) {
        return 'pdf';
    }

    return 'unknown';
  }
}

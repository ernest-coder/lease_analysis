import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input() progress: 1 | 2 | 3 = 1;

  constructor(
    private translateService: TranslateService,

  ) {}

  get steps(): { title: string; subtitle: string }[] {
    return [
      { title: this.translateService.instant('breadcrumb.title_1'), subtitle: this.translateService.instant('breadcrumb.subtitle_1') },
      { title: this.translateService.instant('breadcrumb.title_2'), subtitle: this.translateService.instant('breadcrumb.subtitle_2') },
      { title: this.translateService.instant('breadcrumb.title_3'), subtitle: this.translateService.instant('breadcrumb.subtitle_3') },
    ];
  }
}

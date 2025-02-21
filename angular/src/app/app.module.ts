import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from './shared/shared.module';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { UploadFileAreaComponent } from './shared/components/upload-file-area/upload-file-area.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './shared/services/language.service';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './features/question/question-list/question-list.component';
import { TemplatePageComponent } from './features/template/template-page/template-page.component';
import { TemplateItemComponent } from "./features/template/template-item/template-item.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AnalyzePageComponent } from './features/analyze/analyze-page/analyze-page.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomePageComponent,
    UploadFileAreaComponent,
    QuestionListComponent,
    TemplatePageComponent,
    TemplateItemComponent,
    AnalyzePageComponent
  ],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    SharedModule,
    MatTooltipModule,
],
  providers: [
    {
      provide: LOCALE_ID,
      deps: [LanguageService],
      useFactory: (localeService: LanguageService) => localeService.getCurrentLanguage(),
    },
    provideAnimationsAsync(),
  ],  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

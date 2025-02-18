import {Injectable} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang!: string;

  constructor(private translate: TranslateService) {
    // Find preferred language in local storage
    const storedLang = localStorage.getItem('lang');

    // Detect the browser language
    const browserLang = navigator.language.split('-')[0];
    // const correctedBrowserLang = browserLang.match(/en|fr/) ? browserLang : 'en'; // Default to 'en' if browserLang is not 'en' or 'fr'
    const correctedBrowserLang = 'en'; 

    this.setLanguage(storedLang || correctedBrowserLang);

    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
  }

  // Method to set a specific language
  setLanguage(lang: string) {
    this.currentLang = 'en';
    // this.currentLang = lang;
    this.translate.use(this.currentLang);
    this.setAngularLocale(lang);

    // Store the language in local storage
    localStorage.setItem('lang', lang);
  }

  // Method to get the current language
  getCurrentLanguage(): string {
    return this.currentLang;
  }

  setAngularLocale(locale: string) {
    // switch (locale) {
      // case 'fr':
      //   registerLocaleData(localeFr);
      //   break;
      // case 'en':
        registerLocaleData(localeEn);
        // break;
    // }
  }
}

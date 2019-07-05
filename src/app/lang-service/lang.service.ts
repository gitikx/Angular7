import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { values } from 'lodash';
import { Languages } from '../resources/languages.enum';

@Injectable()
export class LangService {

  public currentLanguage: string = this.translate.currentLang;

  /**
  * Creates an instance of this class that manipulates 
  * language settings.
  *
  * @param translate Translate service from ngx-translate/core
  * 
  */
  constructor(public translate: TranslateService) {
    translate.setDefaultLang('En');
    translate.addLangs(values(Languages));
    translate.use('Ru');
  }

  /**
  * Changes current language of application.
  *
  * @param language Text value of language
  * 
  */
  public changeLanguage(language: string): any {
    this.translate.use(language);
    return this.translate.onLangChange;
  }

  /**
  * Returns translation of recieved word.
  *
  * @param string Text, that should be translated
  * 
  */
  public getTranslation(string: string): string {
    return this.translate.instant(string);
  }

}

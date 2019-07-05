import { Pipe, PipeTransform} from '@angular/core';
import * as _ from "lodash";
import { LangService } from '../lang-service/lang.service';


@Pipe({
  name: 'digit'
})
export class DigitPipe implements PipeTransform {

  /**
  * Deletes all digits from string and returns new value.
  * If string doesn't contain any digits, returns translated
  * alert.
  *
  * @param value String value which will be filtered
  * 
  */
  transform(value: string) {
    let newValue = _.replace(value, /[^\d]/gi, '');
    if (newValue === "") return this.langService.getTranslation("NODIGITS");
    return newValue;
  }

  /**
  * Creates an instance of this class that filter strings.
  *
  * @param langService language service to get translations from
  * 
  */
  constructor(private langService: LangService) { }

}

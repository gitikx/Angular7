import { Component, Output, EventEmitter, Input } from '@angular/core';
import { values } from 'lodash';
import { Languages } from '../resources/languages.enum';

@Component({
  selector: 'app-settings-component',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  @Output()
  onSetted = new EventEmitter<any>();
  @Input()
  name: string;
  @Input()
  language: string;
  @Input()
  languages: Array<string>;
  @Output()
  onChanged = new EventEmitter<any>();

  ngOnInit() {
    this.languages = values(Languages);
  }

  /**
  * Calls parent component void to close settings component.
  *
  */
  public close(): void {
    this.onSetted.emit();
  }

  /**
  * Calls parent function to change application settings
  * 
  */
  public apply(): void {
    this.onChanged.emit({ name: this.name, lang: this.language });
    this.onSetted.emit();
  }
}

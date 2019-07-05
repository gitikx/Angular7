import { Component, OnInit } from '@angular/core';
import { DataService, Element } from './data-service/data.service';
import { LangService } from './lang-service/lang.service';
import { Languages } from './resources/languages.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public properties: object;
  public showSetting: boolean = false;
  public showFilterParameter: boolean = false;
  private searchParameters: object = {
    text: "",
    color: ""
  };
  public items: Array<Element> = [];
  public interval: any;
  public name: string;
  public language: string;


  ngOnInit(): void {
    this.updateData();
    this.name = "Никита";
    this.language = Languages.RU;
  }

  /**
  * Creates an instance of this class that manipulates
  * all component of application
  *
  * @param dataService Service to get data
  * @param langService Language serivce
  * 
  */
  constructor(private dataService: DataService, private langService: LangService) {
  }

  /**
  * Changes filter component state(show/hide).
  *
  */
  public showFilter(): void {
    this.showFilterParameter = !this.showFilterParameter;
  }


  /**
  * Changes current settings(name and language).
  *
  * @param properties Object with fields lang and name
  * from string
  */
  public changeSettings(properties: any): void {
    this.language = properties.lang;
    this.name = properties.name;
    this.langService.changeLanguage(properties.lang).subscribe(() => {
      this.dataService.changeTitleLanguage();
      this.updateData();
    });
  }

  /**
  * Changes settings component state(show/hide).
  *
  */
  public changeSettingState(): void {
    this.showSetting = !this.showSetting;
  }

  /**
  * Gets data from Data Service.
  *
  */
  private updateData(): void {
    this.items = this.dataService.getData(this.searchParameters);
  }

  /**
  * Pushes data to data service.
  * 
  * @param input Input string
  */
  public onAdded(input: string): void {
    if (input !== "") {
      this.dataService.push(input);
      this.startInterval();
      this.updateData();
    }
  }

  /**
  * Updates filter parameters and then updates data from
  * Data Service.
  *
  * @param parameters Object with fields text and color
  * 
  */
  public onFiltered(parameters: any): void {
    this.searchParameters = parameters;
    this.updateData();
  }

  /**
  * Resets element state by index, starts interval and updates
  * data.
  *
  * @param index Index of element
  */
  public onChanged(index: number): void {
    this.dataService.reset(index);
    this.startInterval();
    this.updateData();
  }

  /**
  * Calls data service method to delete element and updates
  * data.
  *
  * @param index Index of element
  */
  public onDeleted(index: number): void {
    this.dataService.delete(index);
    this.updateData();
  }

  /**
  * Starts interval to check data for changes.
  *
  */
  private startInterval(): void {
    if (typeof this.interval != undefined) {
      this.intervalFunction();
    };
  };

  /**
  * Interval function to check data for changes.
  *
  */
  private intervalFunction(): void {
    this.updateData();
    this.dataService.isAllElementsRed = false;
    this.dataService.checkData();
    this.interval = setTimeout(() => {
      if (this.dataService.isAllElementsRed) {
        clearTimeout(this.interval);
        this.interval = undefined;
      }
      else this.intervalFunction();
    }, 1000)
  };
}

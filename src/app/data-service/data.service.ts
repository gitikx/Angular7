import { Injectable } from '@angular/core';
import { forEach, filter } from 'lodash';
import { Colors } from '../resources/colors.enum';
import { DigitPipe } from '../digit-pipe/digit.pipe';

@Injectable()
export class DataService {

  public data: Array<Element> = [];
  public isAllElementsRed: boolean = false;

  /**
  * Creates an instance of this class that contains
  * and manipulate application data
  *
  * @param digitPipe filter, that used to clear digits
  * from string
  */
  constructor(private digitPipe: DigitPipe) {

  }

  /**
  * Translates titles of all array's objects.
  */
  public changeTitleLanguage(): void {
    forEach(this.data, (object: Element) => {
      object.label = this.digitPipe.transform(object.text);
      return object;
    });
  }

  /**
  * Checks array and changes colors by creation time
  *
  */
  public checkData(): void {
    let allRed: boolean = true;
    let time: number = new Date().getTime();
    forEach(this.data, function (element: any) {
      if (element.color == Colors.RED) {
        return;
      }
      else {
        let timeOfExisting = (time - element.time) / 1000;
        if (timeOfExisting >= 30 && timeOfExisting <= 60) {
          element.color = Colors.YELLOW;
          allRed = false;
        }
        else if (timeOfExisting > 60) {
          element.color = Colors.RED;
        }
        else allRed = false;
      }
    });
    this.isAllElementsRed = allRed;
  }

  /**
  * Returns data, which filtered by got parameters
  *
  * @param searchParameters Object with filter parameters
  * 
  */
  public getData(searchParameters: any): any[] {
    if (searchParameters.text === "" && searchParameters.color === "") {
      return this.data;
    }
    else {
      return filter(this.data, function (element) {
        if (element.label.indexOf(searchParameters.text) == 0 && element.color.includes(searchParameters.color)) return element;
      }); 
    }
  }

  /**
  * Resets creation time of object and sets green color
  *
  * @param index Index of element in array
  * 
  */
  public reset(index: number): void {
    this.data[index].color = Colors.GREEN;
    this.data[index].time = new Date().getTime();
  }

  /**
   * Pushes element in array
   *
   * @param text String text
   * 
   */
  public push(text: string): void {
    this.data.push(new Element(text, this.digitPipe.transform(text)));
  }

  /**
   * Deletes element in array by index
   *
   * @param index Index of element
   * 
   */
  public delete(index: number): void {
    this.data.splice(index, 1);
  }

}

export class Element {
  text: string;
  time: number;
  color: Colors;
  label: string;

  constructor(text: string, label: string) {
    this.text = text;
    this.time = new Date().getTime();
    this.color = Colors.GREEN;
    this.label = label;
  }
}

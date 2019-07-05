import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Element } from '../data-service/data.service'

@Component({
  selector: 'app-output-component',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})

export class OutputComponent  {
  @Input()
  items: Array<Element>;
  @Input()
  showFilter: boolean;
  @Output()
  onChanged = new EventEmitter<number>();
  @Output()
  onDeleted = new EventEmitter<number>();
  @Output()
  onFiltered = new EventEmitter<any>();

  /**
  * Calls parent component function to delete element.
  *
  * @param index Index of element to delete
  * 
  */
  public delete = function (index: number): void {
    this.onDeleted.emit(index);
  }

  /**
  * Calls parent component function to reset creation time of object.
  *
  * @param index Index of element to refresh
  * 
  */
  public refresh = function (index: number): void {
    this.onChanged.emit(index);
  }

  /**
  * Calls parent component function to filter array
  *
  * @param parameters Object which contains text and color to
  * filter by
  * 
  */
  public onFilter(parameters: object): void {
    this.onFiltered.emit(parameters);
  }

}

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-component',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  public input: string = '';
  @Output()
  public onAdded = new EventEmitter<string>();
  @Output()
  public onFilterShown = new EventEmitter<any>();

  /**
  * Calls parent component function to add element.
  * Sends inputed text value.
  *
  */
  public add(): void {
    this.onAdded.emit(this.input);
  }

  /**
  * Calls parent component function to show filter component
  *
  */
  public showFilter(): void {
    this.onFilterShown.emit();
  }



}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data-service/data.service';
import { values } from 'lodash';
import { Colors } from '../resources/colors.enum';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  public text: string = "";
  public color: string = "";
  public colors: string[];
  @Output()
  public onFilter = new EventEmitter<any>();

  ngOnInit() {
    this.colors = values(Colors);
    this.colors.unshift("");
  }

  /**
  * Creates an instance of this class that filter objects.
  *
  * @param dataService Data service to get array from
  * 
  */
  constructor(private dataService: DataService) { }


  /**
  * Sets color to filter by.
  *
  * @param color Text value of color
  * 
  */
  public setColor(color: any): void {
    this.color = color;
  }


  /**
  * Calls function of parent component and send parameters.
  * 
  */
  public doFilter(): void {
    this.onFilter.emit({ text: this.text, color: this.color });
  }


  /**
  * Clears filter parameters.
  * 
  */
  public clearFilter(): void {
    this.color = "";
    this.text = "";
    this.onFilter.emit({ text: this.text, color: this.color });
  }

}

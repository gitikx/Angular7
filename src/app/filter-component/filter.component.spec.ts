import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { By } from '@angular/platform-browser';
import { DataService } from '../data-service/data.service';
import { DigitPipe } from '../digit-pipe/digit.pipe';
import { LangService } from '../lang-service/lang.service';

describe('FilterComponent', () => {
    let component: FilterComponent;
    let fixture: ComponentFixture<FilterComponent>;

    beforeEach((() => {
        TestBed.configureTestingModule({
            imports: [FormsModule,
                HttpClientModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                    }
                })],
            declarations: [FilterComponent],
            providers: [DataService, DigitPipe, LangService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should call onFiltered function with parameters', () => {
        spyOn(component.onFilter, 'emit');

        let input = fixture.debugElement.query(By.css('.inputTxt')).nativeElement;
        let button = fixture.debugElement.query(By.css('.submitBtn')).nativeElement;
        let select = fixture.debugElement.query(By.css('.selector')).nativeElement;
        select.value = select.options[2].value;
        input.value = "123";
        input.dispatchEvent(new Event('input'));
        select.dispatchEvent(new Event('change'))
        button.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(component.onFilter.emit).toHaveBeenCalledWith({ text: "123", color: "yellow" });
    });

    it('should call onFiltered function without any parameters', () => {
        spyOn(component.onFilter, 'emit');


        let button = fixture.debugElement.query(By.css('.cleanBtn')).nativeElement;
        button.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(component.onFilter.emit).toHaveBeenCalledWith({ text: "", color: "" });
    });


});

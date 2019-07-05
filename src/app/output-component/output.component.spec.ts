import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputComponent } from './output.component';
import { FilterComponent } from '../filter-component/filter.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DigitPipe } from '../digit-pipe/digit.pipe';
import {Element} from '../data-service/data.service';

describe('OutputComponent', () => {
    let component: OutputComponent;
    let fixture: ComponentFixture<OutputComponent>;

    beforeEach((() => {
        TestBed.configureTestingModule({
            declarations: [OutputComponent, FilterComponent, DigitPipe],
            imports: [FormsModule,
                HttpClientModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                    }
                })],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OutputComponent);
        component = fixture.componentInstance;
        component.items = [];
        fixture.detectChanges();
    });

    it('should create component with empty array', () => {
        expect(component).toBeTruthy();
        expect(component.items.length).toBe(0);
    });

    it('should show "No elements" when array is empty', () => {
        let compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelector('.alert').textContent).toContain('NOELEMENTS');
    });

    it('should not show "No elements" when array is full', () => {
        let compiled = fixture.debugElement.nativeElement;
        component.items = [new Element("123", "123")];
        fixture.detectChanges();

        expect(compiled.querySelector('.alert')).toBe(null);
    });


    it('should call onDeleted function', () => {
        spyOn(component.onDeleted, 'emit');
        component.items = [new Element("123", "123")];
        fixture.detectChanges();
        let button = fixture.debugElement.query(By.css('.delete')).nativeElement;
        button.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(component.onDeleted.emit).toHaveBeenCalledWith(0);
    });

    it('should call onChanged function', () => {
        spyOn(component.onChanged, 'emit');
        component.items = [new Element("123", "123")];
        fixture.detectChanges();
        let button = fixture.debugElement.query(By.css('.refresh')).nativeElement;
        button.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(component.onChanged.emit).toHaveBeenCalledWith(0);
    });

    it('should call onFiltered function', () => {
        spyOn(component.onFiltered, 'emit');
        component.onFilter({ text: "empty" });

        expect(component.onFiltered.emit).toHaveBeenCalledWith({ text: "empty" });
    });
});

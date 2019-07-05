import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

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
            declarations: [InputComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call onAdded function', () => {
        spyOn(component.onAdded, 'emit');

        let input = fixture.debugElement.query(By.css('.inputTxt')).nativeElement;
        let button = fixture.debugElement.query(By.css('.submitBtn')).nativeElement;
        input.value = "";
        input.dispatchEvent(new Event('input'));
        button.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(component.onAdded.emit).toHaveBeenCalledWith("");
    });
});

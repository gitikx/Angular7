import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Languages } from '../resources/languages.enum';
import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('SettingComponent', () => {
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;

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
            declarations: [SettingsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        component.language = "Ru";
        component.name = "Nikita";
        fixture.detectChanges();
    });

    it('should create component with default parameters', () => {
        expect(component.language).toBe("Ru");
        expect(component.name).toBe("Nikita");
        expect(component).toBeDefined();
    });

    it('should call onChanged function with parameters {name "vaskya",lang: "en"}', () => {
        spyOn(component.onChanged, 'emit');

        let input = fixture.debugElement.query(By.css('.inputname')).nativeElement;
        let button = fixture.debugElement.query(By.css('.applyBtn')).nativeElement;
        let select = fixture.debugElement.query(By.css('.select')).nativeElement;
        select.value = select.options[2].value;
        input.value = "Vaskya";
        input.dispatchEvent(new Event('input'));
        select.dispatchEvent(new Event('change'))
        button.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(component.onChanged.emit).toHaveBeenCalledWith({name: "Vaskya", lang: "De"});
    })

    it('should call onSetted function', () => {
        spyOn(component.onSetted, 'emit');

        const nativeElement = fixture.nativeElement;
        const button = nativeElement.querySelector('button');
        button.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(component.onSetted.emit).toHaveBeenCalled();
    })
});

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings-component/settings.component';
import { InputComponent } from './input-component/input.component';
import { OutputComponent } from './output-component/output.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.module';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter-component/filter.component';
import { DigitPipe } from './digit-pipe/digit.pipe';
import { DataService } from './data-service/data.service';
import { LangService } from './lang-service/lang.service';

describe('AppComponent', () => {
    beforeEach((() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                SettingsComponent,
                InputComponent,
                OutputComponent,
                FilterComponent,
                DigitPipe
            ],
            imports: [
                FormsModule,
                HttpClientModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                    }
                })
            ]
            ,
            providers: [DataService, LangService, DigitPipe]
        }).compileComponents();
    }));

    it('should create the app', () => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.componentInstance;

        expect(app).toBeDefined();
    });

    it('interval should be stopped on component creation', () => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.componentInstance;

        expect(app.interval).toBeUndefined();
    })

    it('interval should be started on element push', () => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.componentInstance;
        app.onAdded("someText");

        expect(app.interval).toBeDefined();
    })
});

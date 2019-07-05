import { TestBed } from '@angular/core/testing';

import { LangService } from './lang.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';

describe('LangService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            })
        ],
        providers: [LangService]
    }));

    it('should be created', () => {
        let service: LangService = TestBed.get(LangService);
        expect(service).toBeTruthy();

    });

    it('initial language should be Ru', () => {
        let service: LangService = TestBed.get(LangService);

        expect(service.translate.currentLang).toBe("Ru");
    })
});

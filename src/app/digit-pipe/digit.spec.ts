import { DigitPipe } from './digit.pipe';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { LangService } from '../lang-service/lang.service';


describe('DigitPipe', () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [
            DigitPipe
        ],
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
        providers:[LangService, DigitPipe,LangService]
    }).compileComponents());

    it('create an instance', () => {
        let pipe: DigitPipe = TestBed.get(DigitPipe);
        expect(pipe).toBeDefined();
    });

    it('should return NODIGITS when string does not contain digits', () => {
        let pipe: DigitPipe = TestBed.get(DigitPipe);
        expect(pipe.transform("dasdsadsa")).toBe("NODIGITS")
    })

    it('should delete digits from string', () => {
        let pipe: DigitPipe = TestBed.get(DigitPipe);
        expect(pipe.transform("dasdsadsa213")).toBe("213");
    })

    it('should return NODIGITS when value is undefined', () => {
        let pipe: DigitPipe = TestBed.get(DigitPipe);
        expect(pipe.transform(undefined)).toBe("NODIGITS");
    })

    it('should return NODIGITS when value is null', () => {
        let pipe: DigitPipe = TestBed.get(DigitPipe);
        expect(pipe.transform(null)).toBe("NODIGITS");
    })
});

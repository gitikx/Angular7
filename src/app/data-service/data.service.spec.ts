import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { DigitPipe } from '../digit-pipe/digit.pipe';
import { DataService } from '../data-service/data.service';
import { LangService } from '../lang-service/lang.service';
import { Colors } from '../resources/colors.enum';

describe('DataServiceService', () => {
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
        providers: [DataService, LangService, DigitPipe]
    }).compileComponents());

    it('should push element', () => {
        let service: DataService = TestBed.get(DataService);

        expect(service.data.length).toBe(0);
        service.push("element");
        expect(service.data.length).toBe(1);
    });

    it('should delete element', () => {
        let service: DataService = TestBed.get(DataService);

        service.push("element");
        expect(service.data.length).toBe(1);
        service.delete(0);
        expect(service.data.length).toBe(0);
    });

    it('should reset color of element', () => {
        let service: DataService = TestBed.get(DataService);
        service.push("element");
        service.data[0].color = Colors.YELLOW;
        service.reset(0);

        expect(service.data[0].color).toBe("green");
    });


    it('should filter elements', () => {
        let service: DataService = TestBed.get(DataService);
        service.push("12");
        service.push("123");
        service.push("123");
        service.data[2].color = Colors.YELLOW;

        expect(service.getData({ text: "123", color: "green" }).length).toBe(1);
    });

    it('should change elements colors', () => {
        let service: DataService = TestBed.get(DataService);
        service.push("123");
        service.data[0].time -= 10000000000;
        service.checkData();

        expect(service.data[0].color).toBe("red");
    });

});

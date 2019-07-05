import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { DataService } from './data-service/data.service';
import { InputComponent } from './input-component/input.component';
import { OutputComponent } from './output-component/output.component';
import { SettingsComponent } from './settings-component/settings.component';
import { FilterComponent } from './filter-component/filter.component';
import { DigitPipe } from './digit-pipe/digit.pipe';
import { LangService } from './lang-service/lang.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    OutputComponent,
    SettingsComponent,
    FilterComponent,
    DigitPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [DataService, LangService, DigitPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

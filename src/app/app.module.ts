import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {AppCommonModule} from './app-common/app-common.module';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from '@core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppCommonModule,
    AppRoutingModule,
    BrowserModule,
    CoreModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}

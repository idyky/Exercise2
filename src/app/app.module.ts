import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from "wijmo/wijmo.angular2.grid.filter";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WjGridModule,
    WjGridFilterModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

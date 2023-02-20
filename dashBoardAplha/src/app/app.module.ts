import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainDashBoardComponent } from './main-dash-board/main-dash-board.component';
import { PiechartComponent } from './piechart/piechart.component';


@NgModule({
  declarations: [
    AppComponent,
    MainDashBoardComponent,
    PiechartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

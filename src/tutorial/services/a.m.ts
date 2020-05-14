import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppCompon } from './app.compon';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import {LoggingService} from "./shared/logging.service";

@NgModule({
  declarations: [
    AppCompon,
    AccountComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [LoggingService],
  bootstrap: [AppCompon]
})
export class AM { }

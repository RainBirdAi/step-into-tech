import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {ConversationComponent} from "./conversation/conversation.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConversationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

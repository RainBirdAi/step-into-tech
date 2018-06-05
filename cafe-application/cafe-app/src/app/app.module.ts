import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConversationModule } from "./conversation/conversation.module";
import { CoreModule } from "./core/core.module";
import {ConversationService} from "./conversation/conversation.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ConversationModule,
    CoreModule
  ],
  providers: [ConversationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

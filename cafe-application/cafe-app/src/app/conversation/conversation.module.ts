import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from './conversation.component';
import { InteractionComponent } from './interaction/interaction.component';
import { ResultsComponent } from './results/results.component';
import { ErrorComponent } from './error/error.component';
import { DirectionsComponent } from './directions/directions.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    ConversationComponent,
    InteractionComponent,
    ResultsComponent,
    ErrorComponent,
    DirectionsComponent
  ],
  exports: [
    ConversationComponent
  ]
})
export class ConversationModule { }

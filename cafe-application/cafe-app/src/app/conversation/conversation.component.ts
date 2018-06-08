import { Component, OnInit } from '@angular/core';
import {ConversationService} from "./conversation.service";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  type:string;
  question:any;
  answers:any[];
  error:string;
  thinking:boolean = false;

  constructor(private conservationService: ConversationService) { }

  ngOnInit() {
  }

  start(){
    this.thinking = true;
    this.conservationService.start().subscribe(
      result => {
        this.conservationService.query({subject: 'Person', relationship: 'recommended'}).subscribe(
          this.handleRainbirdResponse.bind(this),
          this.handleRainbirdError.bind(this),
          () => console.log('Query complete.')
        );
      },
      this.handleRainbirdError.bind(this),
      () => console.log('Start complete.')
    );
  }

  onResponse(response:any) {
    this.thinking = true;
    this.conservationService.respond({ answers: [response]}).subscribe(
      this.handleRainbirdResponse.bind(this),
      this.handleRainbirdError.bind(this),
      () => console.log('Respond complete.')
    );
  }

  handleRainbirdResponse(result:any) {
    this.thinking = false;
    if (result.question) {
      this.type = 'interaction';
      this.question = result.question;
    } else {
      this.type = 'results';
      this.answers = result.result;
    }
  }

  handleRainbirdError(error: any) {
    this.thinking = false;
    console.log(JSON.stringify(error));
    this.type = 'error';
    this.error = error.message;
  }

  activeSession() {
    return this.conservationService.activeSession();
  }

}

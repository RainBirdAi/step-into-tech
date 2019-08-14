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
  error:any;
  thinking:boolean = false;
  acquiringGPS:boolean = false;
  location:any;

  constructor(private conservationService: ConversationService) { }

  ngOnInit() {
  }

  start() {
      this.type = 'interaction';
      if (navigator.geolocation) {
        this.acquiringGPS = true;
        navigator.geolocation.getCurrentPosition((position) => {
          this.location = position;
          this.acquiringGPS = false;
          this.startInteraction();
        }, (error) => {
          this.acquiringGPS = false;
          this.startInteraction();
        });
      } else {
        this.startInteraction();
      }
  }

  startInteraction(){
    this.thinking = true;
    this.conservationService.start().subscribe(
      result => {
        if (this.location) {
          this.conservationService.inject([{subject: 'Person', relationship: 'start latlng', object: this.location.coords.latitude + ',' + this.location.coords.longitude }]).subscribe(
            this.performQuery.bind(this),
            this.handleRainbirdError.bind(this),
            () => console.log('Inject complete.')
          );
        } else {
          this.performQuery();
        }
      },
      this.handleRainbirdError.bind(this),
      () => console.log('Start complete.')
    );
  }

  performQuery() {
    this.conservationService.query({subject: 'Person', relationship: 'recommended'}).subscribe(
      this.handleRainbirdResponse.bind(this),
      this.handleRainbirdError.bind(this),
      () => console.log('Query complete.')
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

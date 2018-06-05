import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConversationService} from "../conversation.service";

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit {

  @Input() question:any;
  @Output() response = new EventEmitter<any>();
  answer:string = '';

  constructor(private conservationService: ConversationService) { }

  ngOnInit() {
  }

  continue() {
    console.log('Continue button pressed.');
    this.response.emit({ subject: this.question.subject, relationship: this.question.relationship, object: this.answer, cf: 100 });
    this.answer = '';
  }

  onEnter() {
      console.log('Enter key pressed.');
      this.response.emit({ subject: this.question.subject, relationship: this.question.relationship, object: this.answer, cf: 100 });
      this.answer = '';
  }

}

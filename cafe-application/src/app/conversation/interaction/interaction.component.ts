import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InteractionService} from "./interaction.service";

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit {
  @Input() question :any;
  @Input() thinking :boolean;
  @Output() response = new EventEmitter<any>();
  answer: string;
  places: any;

  constructor(private interactionService: InteractionService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.reset();
  }

  continue() {
    this.response.emit({
      subject: this.question.subject,
      relationship: this.question.relationship,
      object: this.answer,
      cf: 100
    });
    this.reset();
  }

  onKeyUp(event:any) {
      if ((this.answer.length > 3) && (event.eventCode !== 13) && (this.answer.length % 2 === 0)){
        this.interactionService.search(this.answer).subscribe(
          result => {
            this.places = result;
          },
            error => console.log(JSON.stringify(error)),
            () => console.log('Search completed')
        );
      }
  }

  reset() {
    this.answer = '';
    this.places = [];
  }
}

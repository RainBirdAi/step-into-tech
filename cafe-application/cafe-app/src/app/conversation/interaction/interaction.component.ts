import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConversationService} from "../conversation.service";

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit {

  @Input() question:string;
  @Output() response = new EventEmitter<any>();

  count:number = 0;

  constructor(private conservationService: ConversationService) { }

  ngOnInit() {
  }

  continue() {
    console.log('Continue button pressed.');
    this.count += 1;
    if (this.count === 1) {
      this.response.emit({ subject: 'Person', relationship: 'location address', object: 'Muspole Street, Norwich', cf: 100 });
    } else {
      this.response.emit({ subject: 'Person', relationship: 'destination address', object: 'Norwich City Football Club, Norwich', cf: 100 });
    }
  }

}

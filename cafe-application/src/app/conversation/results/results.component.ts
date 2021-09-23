import {Component, Input, OnInit} from '@angular/core';
import {ConversationService} from "../conversation.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() sessionID:string;
  @Input() answers:any[];
  displayMap = false;
  mapLink: SafeResourceUrl;

  constructor(private conversationService: ConversationService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  showDirections(cafe: string) {


    console.log(`Request directions for ${cafe}`)
    this.conversationService.query({subject: cafe, relationship: 'Google maps link'}).subscribe(
      (result:any) => {
        this.mapLink = this.sanitizer.bypassSecurityTrustResourceUrl(result.result[0].object);;
        this.displayMap = true;
      }
    );

  }

}

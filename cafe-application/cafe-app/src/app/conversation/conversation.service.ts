import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  rainbirdAPIUrl:string = '';
  rainbirdAPIKey:string = '';
  rainbirdKMID:string = '';

  rainbirdSessionID:string;

  constructor(private http: HttpClient) { }

  start() {
    return this.http.get<Object>(
      `${this.rainbirdAPIUrl}/start/${this.rainbirdKMID}`,
      { headers: new HttpHeaders({
          'Authorization': `Basic ${btoa(this.rainbirdAPIKey + ':')}`
        })
      }).pipe(map((response:any) => {
        this.rainbirdSessionID = response.id;
        console.log(this.rainbirdSessionID);
    }));
  }

  query(body:any) {
    return this.http.post<Object>(`${this.rainbirdAPIUrl}/${this.rainbirdSessionID}/query`, body);
  }

  inject(data:any[]) {
    return this.http.post<Object>(`${this.rainbirdAPIUrl}/${this.rainbirdSessionID}/inject`, data);
  }

  respond(answer:any) {
    return this.http.post<Object>(`${this.rainbirdAPIUrl}/${this.rainbirdSessionID}/response`, answer);
  }

  activeSession() {
    return !!this.rainbirdSessionID;
  }

}

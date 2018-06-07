import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  placesAutocompleteAPIUrl:string = 'http://places.rainbird.technology/search?location=';

  constructor(private http: HttpClient) {}

  search(searchTerm:string) {
    return this.http.get<Object>(`${this.placesAutocompleteAPIUrl}${searchTerm}`);
  }

}

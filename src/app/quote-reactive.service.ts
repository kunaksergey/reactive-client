import { Injectable } from '@angular/core';
import {Quote} from './model/quote';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteReactiveService {
  url = 'http://localhost:8080/quotes-reactive';
  urlPages = 'http://localhost:8080/quotes-reactive-paged';
  private quotes: Quote[] = [];
  constructor() { }

  getQuoteStrim(page?: number, size?: number) {
    this.quotes = [];
    return Observable.create((observer) => {
      let url = this.url;
      if (page != null) {
        url = this.urlPages + '?page=' + page + '&size=' + size;
      }
      const evenSource = new EventSource(url);
      evenSource.onmessage = (event) => {
        console.debug('Received event: ' + event);
        const json = JSON.parse(event.data);
        this.quotes.push(new Quote(json['id'], json['book'], json['content']));
        console.log(this.quotes);
        observer.next(this.quotes);
      };

      evenSource.onerror = (error) => {
        if (evenSource.readyState === 0) {
          console.log('The stream has been closed by server.');
          evenSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      };
    });

  }
}

import { Injectable } from '@angular/core';
import { Quote } from './model/quote';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteBlockingService {
  url = 'http://localhost:8080/quotes-blocking';
  urlPaged = 'http://localhost:8080/quotes-blocking-paged';
  private quotes: Quote[] = [];
  constructor( private http: HttpClient) { }

  getQuotes(page?: number, size?: number): Observable<Array<Quote>> {
    this.quotes = [];
    let url = this.url;
    if (page != null ) {
      url = this.urlPaged + '?page=' + page + '&size=' + size;
    }
    return this.http.get<Array<Quote>>(url);
  }
}

import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuoteReactiveService} from '../quote-reactive.service';
import {Observable} from 'rxjs';
import {Quote} from '../model/quote';
import {QuoteBlockingService} from '../quote-blocking.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
  providers: [QuoteReactiveService]
})
export class QuotesComponent implements OnInit, AfterViewInit {
  quotes$: Observable<Quote[]>;
  quotes: Quote[];
  selectedQuote: Quote;
  mode: String;
  pagination: boolean;
  page: number;
  size: number;

  constructor(private quoteReactiveService: QuoteReactiveService,
              private quoteBlockingService: QuoteBlockingService,
              private cd: ChangeDetectorRef) {
    this.pagination = true;
    this.mode = 'reactive';
    this.page = 0;
    this.size = 50;
  }

  requestQuoteStream(): void {
    if (this.pagination = true) {
      this.quotes$ = this.quoteReactiveService.getQuoteStrim(this.page, this.size);
    } else {
      this.quotes$ = this.quoteReactiveService.getQuoteStrim();
    }
  }

  requestQuoteBlocking(): void {
    if (this.pagination === true) {
      this.quotes$ = this.quoteBlockingService.getQuotes(this.page, this.size);
    } else {
      this.quotes$ = this.quoteBlockingService.getQuotes();
    }

  }

  onSelect(quote: Quote) {
    this.selectedQuote = quote;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.quotes$ = this.quoteReactiveService.getQuoteStrim(this.page, this.size);
  }

}

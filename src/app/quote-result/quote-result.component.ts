import {Component, Input, OnInit} from '@angular/core';
import {Quote} from '../model/quote';

@Component({
  selector: 'app-quote-result',
  templateUrl: './quote-result.component.html',
  styleUrls: ['./quote-result.component.css']
})
export class QuoteResultComponent implements OnInit {
@Input() quote: Quote;
  constructor() { }

  ngOnInit() {
  }

}

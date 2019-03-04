import { Component } from '@angular/core';
import {Quote} from './model/quote';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  results: Quote[];
  title = 'reactive-client';

  updateResults(results: Quote[]) {
    this.results = results;
  }
}

import { Component, OnInit } from '@angular/core';
import * as data from "./buyCards1.json";
import { FormControl } from '@angular/forms';
import { CardService } from './card-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MtgSite';
  cards = data.cards;
  searchTerm : FormControl = new FormControl();
  myCards = <any>[];
  constructor (private service: CardService,
               private router: Router) {}

  setCard(name) {
    var items = this.service.search(name, this.cards);
    this.service.changeCardList(items);
  }

  navSetCard(name) {
    this.setCard(name);
    this.router.navigate(['/cardlookup']);
  }

  ngOnInit() {
    this.service.changeCardList(this.cards);
    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term != '') {
          this.myCards = this.service.search(term, this.cards);
        }
    })
  }
}

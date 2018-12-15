import { Component, OnInit } from '@angular/core';
//import * as data from "../buyCards1.json";
import { CardService } from '../card-service.service'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-card-lookup',
  templateUrl: './card-lookup.component.html',
  styleUrls: ['./card-lookup.component.css']
})
export class CardLookupComponent implements OnInit {
  list: Array<any> = [];
  cart: Array<any> = [];
  p: Number = 1;
  message: string = "";
  searchTerm: FormControl = new FormControl();
  constructor(private service: CardService) { }
  
  UpdateShoppingCart(id) {
    var found = this.list.find(function(element) {
      return element.id == id;
    });
    
    var object = { newamount: 0, stock_M: 0 };
    Object.assign(object, found);
    found.newamount = 0;
    var alreadyhere = this.cart.find(function(element) {
      return element.id == id;
    });
    
    if(object.newamount != 0)
    {
     
      if(alreadyhere != null) {
        object.newamount += alreadyhere.newamount;
        if(object.newamount > object.stock_M)
        {
          object.newamount = object.stock_M;
          this.message = "There's not enough stock";
        }
        var index = this.cart.indexOf(alreadyhere);
        delete this.cart[index];
        this.cart[index] = object;
      }
      else{
        this.cart.push(object);
      }
      this.service.changeShoppingCart(this.cart);
    }
  }

  ngOnInit() {
    this.service.CardListItems.subscribe(list => this.list = list);
    this.service.ShoppingCartItems.subscribe(cart => this.cart = cart);
    this.list.forEach(item => {
      item.newamount = 1;
    });
    
  }
}

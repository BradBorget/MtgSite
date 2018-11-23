import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }
  
  private cardSource = new BehaviorSubject(<any>[]);
  CardListItems = this.cardSource.asObservable();
  private shoppingCartItemSource = new BehaviorSubject(<any>[]);
  ShoppingCartItems = this.shoppingCartItemSource.asObservable();
  private shoppingCartTotalSource = new BehaviorSubject<String>("");
  ShoppingCartTotal = this.shoppingCartTotalSource.asObservable();


  changeCardList(list: any[])
  {
    this.cardSource.next(list);
  }
  changeShoppingCart(list: any[])
  {
    this.shoppingCartItemSource.next(list);
    var nitem = 0;
    list.forEach(item => {
      nitem += ((+item.price_M) * item.newamount);
    });
    this.shoppingCartTotalSource.next(nitem.toFixed(2));
  }

  search(cardName, cardList) {
    var items = cardList.filter(card => card.name.toLowerCase().indexOf(cardName.toLowerCase()) != -1);
    return items;
  }
}

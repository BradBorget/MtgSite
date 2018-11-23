import { Component, OnInit } from '@angular/core';
import { CardService } from '../card-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  list: Array<any> = [];
  Total: String;
  constructor(private service: CardService,
              private modalService: NgbModal) { }

  UpdateShoppingCart(id) {
    var found = this.list.find(function(element) {
      return element.id == id;
    });
    if(found.newamount > found.stock_M)
    {
      found.newamount = found.stock_M;
    }
    this.service.changeShoppingCart(this.list);
  }

  DeleteItem(id) {
    var found = this.list.find(function(element) {
      return element.id == id;
    });
    var index = this.list.indexOf(found);
    this.list.splice(index, 1);
    console.log(this.list);
    this.UpdateShoppingCart(id);
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.service.ShoppingCartItems.subscribe(list => this.list = list);
    this.service.ShoppingCartTotal.subscribe(num => this.Total = num);
    console.log(this.list);
  }

}
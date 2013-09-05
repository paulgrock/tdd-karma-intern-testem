define([
], function () {
  'use strict';
  var Basket = function(){
    this.items = [];
    this.totalCount = 0;
    this.distinctCount = 0;
    this.discountAmount = 0;
  };

  Basket.prototype.totalPrice = function() {
    var price = 0;
    for (var i = 0; i < this.items.length; i++) {
      var curItem = this.items[i];
      price += curItem.quantity * curItem.item.price
    };
    return price * (1 - (this.discountAmount / 100));
  };


  Basket.prototype.setDiscount = function(amount) {
    this.discountAmount = Math.abs(amount);
  };

  Basket.prototype.itemExistsInBasket = function(item) {
    for (var i = 0, len = this.items.length; i < len; i++) {
      var basketitem = this.items[i];
      if(basketitem.item.id === item.id) {
        return true;
      }
    };
    return false;
  };
  Basket.prototype.getItemFromBasket = function(item) {
    for (var i = 0, len = this.items.length; i < len; i++) {
      var basketitem = this.items[i];
      if(basketitem.item.id === item.id) {
        return basketitem;
      }
    };
    return false;
  };
  Basket.prototype.add = function(item, quantity) {
    if (quantity == null) {
      quantity = 1;
    }
    if(this.itemExistsInBasket(item)) {
      var basketitem = this.getItemFromBasket(item);
      basketitem.quantity += quantity;
    } else {
      this.items.push({
        item: item,
        quantity: quantity
      });
    }

    this.updateCounts();
  };
  Basket.prototype.remove = function(item, quantity) {
    if (quantity == null) {
      quantity = 1;
    }
    if(!this.itemExistsInBasket(item)) {
      return false;
    }
    var basketitem = this.getItemFromBasket(item);
    basketitem.quantity -= quantity;

    if (basketitem.quantity < 1) {
      var itemLoc = this.getItemIndex(item);
      this.items.splice(itemLoc, 1);
    }
    this.updateCounts();
  };


  Basket.prototype.updateCounts = function() {
    var total = 0;
    for (var i = 0; i < this.items.length; i++) {
      total += this.items[i].quantity;
    };
    this.distinctCount = this.items.length;
    this.totalCount = total;
  };

  Basket.prototype.getQuantity = function(item) {
    if (this.itemExistsInBasket(item)) {
      return this.getItemFromBasket(item).quantity;
    }
    return 0;
  }

  Basket.prototype.getItemIndex = function(item) {
    for (var i = 0, len = this.items.length; i < len; i++) {
      var basketitem = this.items[i];
      if(basketitem.item.id === item.id) {
        return i;
      }
    };
    return -1;
  }

  Basket.prototype.empty = function() {
    this.items = [];
    this.distinctCount = 0;
    this.totalCount = 0;
  };
  return Basket;
});

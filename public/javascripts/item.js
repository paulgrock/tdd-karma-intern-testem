define([], function () {
  'use strict';
  var Item = function(id, title, price){
    this.id = id;
    this.title = title;
    this.price = price;
    this.protectedFields = ['id'];
  };

  Item.prototype.update = function(newProperties) {
    for(var key in newProperties) {
      if (newProperties.hasOwnProperty(key)) {
        if (this[key] && !this.fieldIsProtected(key)) {
          this[key] = newProperties[key];
        };
      };
    }
  }

  Item.prototype.addProtectedField = function(field) {
    if (this.protectedFields.indexOf(field) === - 1) {
      this.protectedFields.push(field);
    };
  }

  Item.prototype.fieldIsProtected = function(field) {
    for (var i = 0; i < this.protectedFields.length; i++) {
      if(this.protectedFields[i] === field) {
        return true;
      }
    };
    return false;
  };

  Item.prototype.getRatings = function(field) {

  };

  return Item;
});

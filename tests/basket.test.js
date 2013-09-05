define([
  'chai',
  'basket',
  'item'
  ], function (chai, Basket, Item) {
  'use strict';
  window.expect = chai.expect;
  describe('Basket', function(){
    var basket, laptop, mouse;
    beforeEach(function(){
      basket = new Basket();
      laptop = new Item(1, 'Laptop', 400);
      mouse = new Item(2, 'Mouse', 10);
    })
    describe('adding to basket', function() {
      it('will keep track of distinct items in basket', function(){
        basket.add(laptop);
        expect(basket.totalCount).to.equal(1);
        expect(basket.distinctCount).to.equal(1);

        basket.add(laptop);
        expect(basket.totalCount).to.equal(2);
        expect(basket.distinctCount).to.equal(1);

        basket.add(mouse);
        expect(basket.totalCount).to.equal(3);
        expect(basket.distinctCount).to.equal(3);
      });

      it('will add multiple quantities to the basket', function(){
        basket.add(laptop, 2);
        expect(basket.totalCount).to.equal(2);
        expect(basket.getQuantity(laptop)).to.equal(2);
      });
    });

    describe('removing item from basket', function() {
      it('removes the quantity from basket', function() {
        basket.add(laptop);
        basket.add(laptop);
        basket.remove(laptop, 1)
        expect(basket.getQuantity(laptop)).to.equal(1);
        expect(basket.distinctCount).to.equal(1);
        expect(basket.totalCount).to.equal(1);
      });

      it('should remove the item completely if removing total quantity', function() {
        basket.add(laptop);
        basket.add(laptop);
        basket.remove(laptop, 2)
        expect(basket.getQuantity(laptop)).to.equal(0);
        expect(basket.itemExistsInBasket(laptop)).to.be.false;
      });

      it('should deal with multiple items correctly', function() {
        basket.add(laptop);
        basket.add(laptop);
        basket.add(mouse);
        basket.remove(mouse)
        expect(basket.getQuantity(mouse)).to.equal(0);
        expect(basket.itemExistsInBasket(mouse)).to.be.false;
        expect(basket.getQuantity(laptop)).to.equal(2);
      });

      it('should not break totalCount with invalid quantities', function() {
        basket.add(laptop);
        basket.add(laptop);
        basket.add(mouse);
        basket.remove(laptop, 3)
        expect(basket.totalCount).to.equal(1);
      });
    });

    describe('finding an item in basket', function() {
      it('returns true if the item is in the basket', function() {
        basket.add(laptop);
        expect(basket.itemExistsInBasket(laptop)).to.be.true;

      })
      it('return false if the item isn\'t in the basket', function() {
        expect(basket.itemExistsInBasket(laptop)).to.be.false;
      })
    });

    describe('returning quantity of item in basket', function() {
      it('returns the correct quantity', function() {
        basket.add(laptop);
        basket.add(laptop);
        expect(basket.getQuantity(laptop)).to.equal(2);

      });

      it('return false if the item isn\'t in the basket', function() {
        expect(basket.getQuantity(laptop)).to.equal(0);
      });
    });

    describe('fetching item index', function() {
      it('gets the item index', function() {
        basket.add(laptop);
        expect(basket.getItemIndex(laptop)).to.equal(0);
      });

      it('returns -1 if the item does not exist', function() {
        expect(basket.getItemIndex(laptop)).to.equal(-1);
      });
    });

    describe('fetching item from basket', function() {
      it('returns the item object if it exists', function() {
        basket.add(laptop);
        var result = basket.getItemFromBasket(laptop);
        expect(result.item).to.equal(laptop);
        console.log(result);
        expect(result.quantity).to.equal(1)
      });

      it('returns false if the item is not in the basket', function() {
        expect(basket.getItemFromBasket(laptop)).to.be.false;
      });
    });

    describe('emptying a basket', function() {
      it ('empties a basket with items in it', function(){
        basket.add(laptop);
        basket.empty();
        expect(basket.items).to.have.length(0);
      });
      it('updates count variables', function() {
        basket.add(laptop);
        basket.empty();
        expect(basket.distinctCount).to.equal(0);
        expect(basket.totalCount).to.equal(0);
      })
    });

    describe('total price', function() {
      it ('will calculate the total price', function(){
        basket.add(laptop, 2);
        basket.add(mouse, 3);
        expect(basket.totalPrice()).to.equal(830);
      });

      it ('correctly updates total price', function(){
        basket.add(laptop, 2);
        basket.add(mouse, 2);
        expect(basket.totalPrice()).to.equal(820);
        basket.remove(laptop, 1);
        expect(basket.totalPrice()).to.equal(420);
      });
    });

    describe('Applying discounts', function() {
      it('should apply a discount', function() {
        basket.add(laptop);
        basket.setDiscount(10);
        expect(basket.totalPrice()).to.equal(360);
      })
      it('should persist a discount', function() {
        basket.add(laptop);
        basket.setDiscount(10);
        basket.add(mouse, 2);
        expect(basket.totalPrice()).to.equal(378);
      })

      it('should handle negative discounts', function() {
        basket.setDiscount(-10);
        basket.add(mouse);
        expect(basket.totalPrice()).to.equal(9);
      })
    })

  })
});


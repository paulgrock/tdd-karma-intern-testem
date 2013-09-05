define([
    'intern!bdd',
    'intern/chai!expect',
    'public/javascripts/basket',
    'public/javascripts/item'
], function (bdd, expect, Basket, Item) {
    with(bdd) {
        describe('Basket', function(){
            var basket, laptop, mouse;
            describe('adding to basket', function() {
              beforeEach(function(){
                basket = new Basket();
                laptop = new Item(1, 'Laptop', 400);
                mouse = new Item(2, 'Mouse', 10);
              })
              it('will keep track of distinct items in basket', function(){
                basket.add(laptop);
                expect(basket.totalCount).to.equal(1);
                expect(basket.distinctCount).to.equal(1);

                basket.add(laptop);
                expect(basket.totalCount).to.equal(2);
                expect(basket.distinctCount).to.equal(1);

                basket.add(mouse);
                expect(basket.totalCount).to.equal(3);
                expect(basket.distinctCount).to.equal(2);
              });

              it('will add multiple quantities to the basket', function(){
                basket.empty();
                console.log(basket.totalCount);
                basket.add(laptop, 2);
                console.log(basket.totalCount);
                expect(basket.totalCount).to.equal(2);
                expect(basket.getQuantity(laptop)).to.equal(2);
              });
            });
        })
    }
});

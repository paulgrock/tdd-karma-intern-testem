define([
    'intern!bdd',
    'intern/chai!expect',
    'public/javascripts/item',
    'node_modules/sinon/pkg/sinon-1.7.3'
], function (bdd, expect, Item) {
    with(bdd) {

      describe('Item', function() {
        var item;
        beforeEach(function () {
          item = new Item(1, "Mouse", 10)
        });
        describe('Updating an item', function() {
          it('update an items properties', function() {
            item.update({
              title: "Super Mouse",
              price: 15
            });
            expect(item.title).to.equal("Super Mouse");
            expect(item.price).to.equal(15);
            expect(item.id).to.equal(1);
          })
        })
        describe('Protected fields', function() {
          beforeEach(function () {
            item = new Item(1, "Mouse", 10)
          });
          it('should have the ID as a protected field', function() {
            expect(item.protectedFields).to.contain('id');
            expect(item.protectedFields.length).to.equal(1);
          })
          it('should let us add a protected field', function() {
            item.addProtectedField('title');
            expect(item.protectedFields).to.contain('title');
            expect(item.protectedFields.length).to.equal(2);
          })
          it('should not allow protected fields to be updated', function() {
            item.update({
              id: 5,
              title: "Super Mouse"
            });
            expect(item.title).to.equal("Super Mouse");
            expect(item.id).to.equal(1);
            item.addProtectedField('title');
            item.update({title: 'Mouse'});
            expect(item.title).to.equal("Super Mouse");
          })
        })
        describe('fieldIsProtected', function() {
          it('should return true if field is protected', function() {
            expect(item.fieldIsProtected('id')).to.be.true;
          })

          it('should return false if field is protected', function() {
            expect(item.fieldIsProtected('title')).to.be.false;
          })
        })

        describe('get ratings from a third party', function() {
          beforeEach(function () {
            item = new Item(1, "Mouse", 10);

            sinon.stub(item, 'getRatings').returns({
              ratings: [
                {
                  rating: 4,
                  review: "This is a really great product",
                  source: "Amazon"
                },
                {
                  rating: 1,
                  review: "I didn't really like it",
                  source: "PC World"
                },
                {
                  rating: 3,
                  review: "It's pretty average",
                  source: "Ebay"
                }
              ]
            })
          });
          it('should return the three latest ratings', function() {
            expect(item.getRatings().ratings).to.have.length(3);
          })

          it('parses an individual score', function() {
            expect(item.getRatings().ratings[0].rating).to.equal(4);
          })
        })
      })
    }
});

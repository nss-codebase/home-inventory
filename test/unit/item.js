/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Item = require('../../app/models/item');

describe('Item', function(){
  describe('constructor', function(){
    it('should create a new Item object', function(){
      var couch = new Item('Couch', 'Living', '3/4/2009', '2', '1100');

      expect(couch).to.be.instanceof(Item);
      expect(couch.name).to.equal('Couch');
      expect(couch.room).to.equal('Living');
      expect(couch.acquired).to.be.instanceof(Date);
      expect(couch.count).to.be.a('number');
      expect(couch.count).to.equal(2);
      expect(couch.cost).to.be.a('number');
      expect(couch.cost).to.equal(1100);
    });
  });
});


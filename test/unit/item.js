/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var Item;

describe('Item', function(){
  before(function(done){
    connect('home-inventory-test', function(){
      Item = require('../../app/models/item');
      done();
    });
  });

  beforeEach(function(done){
    global.mongodb.collection('items').remove(function(){
      done();
    });
  });

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

  describe('#save', function(){
    it('should save an item to the mongo database', function(done){
      var couch = new Item('Couch', 'Living', '3/4/2009', '2', '1100');
      couch.save(function(){
        expect(couch._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.find', function(){
    it('should find all the items from the mongo database', function(done){
      var couch = new Item('Couch', 'Living', '3/4/2009', '2', '1100');
      couch.save(function(){
        Item.find({}, function(items){
          expect(items).to.have.length(1);
          done();
        });
      });
    });

    it('should find specific items from the mongo database', function(done){
      var couch = new Item('Couch', 'Living', '3/4/2009', '2', '900');
      var chair = new Item('Chair', 'Living', '4/7/2009', '3', '250');
      var table = new Item('Table', 'Living', '5/1/2009', '7', '700');

      couch.save(function(){
        chair.save(function(){
          table.save(function(){
            Item.find({name:'Chair'}, function(items){
              expect(items).to.have.length(1);
              expect(items[0].name).to.equal('Chair');
              done();
            });
          });
        });
      });
    });
  });

  describe('#value', function(){
    it('should return the value for a particular item', function(){
      var couch = new Item('Couch', 'Living', '3/4/2009', '2', '900');
      var val = couch.value();
      expect(val).to.equal(1800);
    });
  });

  describe('.value', function(){
    it('should return the value for a group of items', function(done){
      var couch     = new Item('Couch',     'Living',  '3/4/2009', '2', '900');
      var oven      = new Item('Oven',      'Kitchen', '4/7/2009', '2', '250');
      var microwave = new Item('Microwave', 'Kitchen', '9/7/2009', '3', '445');
      var table     = new Item('Table',     'Living',  '5/1/2009', '7', '700');

      couch.save(function(){
        oven.save(function(){
          microwave.save(function(){
            table.save(function(){
              Item.value({room:'Kitchen'}, function(value){
                expect(value).to.equal(1835);
                done();
              });
            });
          });
        });
      });
    });
  });
});


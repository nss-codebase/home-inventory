'use strict';

function Item(name, room, acquired, count, cost){
  this.name = name;
  this.room = room;
  this.acquired = new Date(acquired);
  this.count = parseInt(count);
  this.cost = parseFloat(cost);
}

module.exports = Item;


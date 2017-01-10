'use strict';

module.exports = function (price, quantity) {
  // console.log('price and quantity are ', price, quantity);
   let orderPrice = ((price * quantity)/100)+'.00';
   return orderPrice;
};

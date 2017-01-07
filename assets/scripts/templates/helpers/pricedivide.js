'use strict';

// const store = require('../../store');
// const Handlebars = require('handlebars');

module.exports = function (price) {
  console.log('price is ', price);
   let productPrice = ((price/100)+'.00');
   return productPrice;
};

// Handlebars.registerHelper("dollarize", function(price) {
//   return (price)/100+'.00';
//   return "dollarize";
// });

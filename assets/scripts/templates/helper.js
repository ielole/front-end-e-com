'use strict';

const Handlebars = require('handlebars');

module.exports = function (price, nesting) {
  nesting = +nesting || 1;
  return new Handlebars.SafeString(`<h${nesting}>${price}</h${nesting}>h{nesting}>`);
};

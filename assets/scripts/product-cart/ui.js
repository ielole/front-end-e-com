'use strict';
const store = require('../store.js');
const showAllProductsTemplate = require('../templates/product-thumb.handlebars');

const showOneProductTemplate = require('../templates/products.handlebars');
const cartTemplate = require('../templates/cart.handlebars');
const orderHxTemplate = require('../templates/order-history.handlebars');
const sr = require('../animations/scroll-reveal.js');

const api = require('./api.js');

// const StripeCheckoutSuccess = function(){
//   console.log('You\'ve successfully placed your order.');
// };

const getAllProductsSuccess = function(data) {
  store.products = data.products;
  // console.log('this is get all product data.products', data.products);
  $('#all-products').html(showAllProductsTemplate(data));
  sr.revealWatch('.product-title', '.product-thumb');
};

const getAllProductsFailure = function() {
  console.log('FAIL to get all Products!');
};

const clear = (modal) => {
    setTimeout(function() {
        $(modal).modal('hide');
    }, 1500);
    // $(modal).on('hidden.bs.modal', function() {
    //     $(this).find("input,textarea,select").val('').end();
    //     // $('.modal-success').text('');
    // });
};

const getOneProductSuccess = function(data) {
  // console.log('Yay data', data);
   $('#one-product').html(showOneProductTemplate(data));
    // $('.cart-add').hide();
   return data;
};

const getOneProductFailure = function() {
  console.log('FAIL to get ONE Product!');
};

const addItemSuccess = function() {
  // console.log('Item in cart', data);
  $('#cart-button').show();
  $('#checkout-button').show();
  $('.ufm-single-product').html('Watch added to cart successfully!');
  $('.ufm-cart').html('');
  clear('#productModal');
  //  return data;
};

const addItemFailure = function() {
  // console.log('FAIL!', error);
  // console.log('Log in to add items to your cart.');
  $('.ufm-single-product').html('Log in to add items to your cart.');
};

const getItemsSuccess = function(data) {
  store.user.serialized = data.serialized;
  // console.log('I\'m in the cart! This is my item data: ', data);
  // console.log('I\'m data.items', data.serialized);
   $('.cart-items').html(cartTemplate(data));
};

const getItemsFailure = function(error) {
  console.log('FAIL!, this is the error', error);
};

const deleteItemSuccess = function() {
  // console.log('deleted', data);
  $('.ufm-cart').html('Watch deleted from cart successfully!');

};

const deleteItemFailure = function(error) {
  console.log('FAIL!, this is the delete error', error);
};

const updateItemSuccess = function() {
  // console.log('Item quantity updated successfully.', data);
  $('.ufm-cart').html('Watch quantity updated successfully!');
};

const updateItemFailure = function(error) {
  console.log('FAIL!, this is the update error', error);
};

const getPriceTotalSuccess = function(data) {
  // console.log('Here is the price total for the items in the cart: ', data);
  // $('.price-total').empty();
  // let totalPrice = ('$'+data).split();
  // if(totalPrice.length>){
  //   totalPrice = totalPrice.splice(-2,0,'.');
  // }
  let total = ('$'+data).split('');
  // console.log('this is the total after the first line:', total);
  total.splice(total.length-2,0,'.');
  // console.log('this is the total:', total);
  if(total.length > 7){
    total.splice(total.length-6,0,',');
  }
  total = total.join('');
  $('.price-total').html(total);
  store.totalCart = data;
  // console.log(store.totalCart);
  return store.totalCart;
};

const getPriceTotalFailure = function(error) {
  console.log('FAIL!, this is the getPriceTotal error.', error);
};

const clearCart = function(){
  // console.log('I\'m clearing the cart');
  api.getItems()
    .then(data => {
      // console.log('Cart Contents: ',data);
      //data.serialized[0]
      for(let item in data.serialized) {
        api.deleteItem(data.serialized[item].id);
      }
      return('Cleared!');
    })
    .catch(deleteItemFailure);
  store.user.serialized = [];
  $('.ufm-cart').html('Your order has been placed. View your Purchases to see past orders.');
  $('.cart-items').empty();
  $('.price-total').html('$0');
  $('#checkout-button').hide();
  clear('#cart');
};

const createOrderHxSuccess = function() {
  // console.log('This is your NEW ORDER hx:', data);
  // console.log('This is your data.order._id:', data.order._id);
  // console.log('This is your data.order.items:', data.order.items);
  // console.log('This is your data.order.createdAt:', data.order.createdAt);
  clearCart();
  // console.log('This is your store.user.serialized', store.user.serialized);
};

const createOrderHxFailure = function(error) {
  console.log('FAIL!, this is the NEW order hx error:', error);
};

const getOrderHxSuccess = function(data) {
  // console.log('This is your order hx:', data);
  $('#order-history').html(orderHxTemplate(data));
};

const getOrderHxFailure = function(error) {
  console.log('FAIL!, this is the order hx error:', error);
};



module.exports = {
  // StripeCheckoutSuccess,
  getAllProductsSuccess,
  getAllProductsFailure,
  getOneProductSuccess,
  getOneProductFailure,
  addItemSuccess,
  addItemFailure,
  getItemsSuccess,
  getItemsFailure,
  deleteItemSuccess,
  deleteItemFailure,
  updateItemSuccess,
  updateItemFailure,
  getPriceTotalSuccess,
  getPriceTotalFailure,
  createOrderHxSuccess,
  createOrderHxFailure,
  getOrderHxSuccess,
  getOrderHxFailure,
  clearCart,
  clear,

};

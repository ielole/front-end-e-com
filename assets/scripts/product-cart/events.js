'use strict';
const api = require('./api');
const ui = require('./ui');
const store = require('../store.js');
const getFormFields = require('../../../lib/get-form-fields');


const onUpdateItem = function(event){
  event.preventDefault();
  let itemId = event.target.getAttribute('data-id');
  let data = getFormFields(this);
  // let data = {item: {count: 4}};
  console.log('I\'m UPDATED itemId and countData', itemId, data);
  api.updateItem(itemId, data)
  .then(ui.updateItemSuccess)
  .then(function(){
    onGetItems();
  })
  .catch(ui.updateItemFailure);
};

const onDeleteItem = function(){
  let id = event.target.getAttribute('data-id');
  console.log('DELETED', id);
  api.deleteItem(id)
    .then(ui.deleteItemSuccess)
    .then(function(){
      onGetItems();
    })
    .catch(ui.deleteItemFailure);
};

const getPriceTotal = function(){
  // return new Promise((resolve, reject) => {
  //
  //     success: (response) => {
  //       resolve(response);
  //     },
  //     error: (error) => {
  //       reject(error);

  let itemList = [];
  let total = 0;

  api.getItems()
  .then((items) => {
    console.log('these are items: ', items);
    for(let item in items.serialized) {
      for(let i = 0; i<items.serialized[item].count; i++) {
        itemList.push(items.serialized[item].product_id);
      }
    }
  })
  .then(api.getAllProducts)
  .then((productList)=>{
    // console.log('these are products and the itemList: ', productList, itemList);
    for(let item in itemList){
      for(let product in productList.products){
        // console.log('this is one', productList.products, 'this is two', itemList[item]);
        if(productList.products[product]._id === itemList[item])
        {
          // console.log('product price', productList.products[product].price);
          total += productList.products[product].price;
          break;
        }
      }
    }
    return total;
  })
  .then(ui.getPriceTotalSuccess)
  .catch(console.error);
};

const onGetItems  = function(){
  console.log('All the items of the cart!');
  api.getItems()
    .then(ui.getItemsSuccess)
    .then(function(){
      $('.update-form').on('submit', onUpdateItem);
      $('.delete-cart-item').on('click', onDeleteItem);
    })
    .then(getPriceTotal)
    // .then(function(data){
    //   console.log(data);
    //   ui.getPriceTotalSuccess(data);
    // })
    // .catch(ui.getPriceTotalFailure)
    .catch(ui.getItemsFailure);
};

const onAddItem = function(event){
  event.preventDefault();
  let countData = getFormFields(event.target);
  console.log('this is the event', event);
  console.log('ADD ME!', 'countData', countData);
    api.addItem(countData)
    .then(ui.addItemSuccess)
    .then(function(data){
      onGetItems(data);
      console.log('after onGetItems');
    })
    .catch(ui.addItemFailure);
};


const onGetOneProduct = function(event){
  event.preventDefault();
  let productId = event.target.getAttribute('data-id');
  console.log('this is the productId', productId);
  api.getOneProduct(productId)
    .then(ui.getOneProductSuccess)
    .then(function(data){
      console.log('this is data, after getOneProductSuccess', data);
      $('.product-to-cart').on('submit', onAddItem);
    })
    .catch(ui.getOneProductFailure);
};

const onGetAllProducts = function(){
  // event.preventDefault();
  console.log('You have ALL products.');
  api.getAllProducts()
    .then(ui.getAllProductsSuccess)
    .then(function(){
      $('.prod-desc').on('click', onGetOneProduct);
    })
    .catch(ui.getAllProductsFailure);
};

const onGetOrderHx = function(event){
  event.preventDefault();
  // console.log('These are my orders!');
  api.getOrderHx()
    .then(ui.getOrderHxSuccess)
    .catch(ui.getOrderHxFailure);
};

// const onClearCart = function(){
//   ui.clearCart;
// };

const onCreateOrderHx = function(){
  console.log('I\'m creating an order');
  let data = {
    order: {
      items: store.user.serialized
    }
  };
  api.createOrderHx(data)
    .then(ui.createOrderHxSuccess)
    .catch(ui.createOrderHxFailure);
  // api.getItems()
    // .then(function(data){
    //   let order = {};
      // for(let item in data.serialized){
      // //   console.log('This is cartData', cartData);
      //   order[item] = data.serialized[item];
      // //   console.log('This is cartData.serialized[items]', cartData.serialized[item]);
      // }
  //     console.log('this is data', data);
  //     api.createOrderHx(data);
  // });

};

const addCartHandlers = function() {
  $('#get-orders').on('click', onGetOrderHx);
  $('#save-order-button').on('click', onGetItems);
};

module.exports = {
  addCartHandlers,
  onGetAllProducts,
  onCreateOrderHx,

};

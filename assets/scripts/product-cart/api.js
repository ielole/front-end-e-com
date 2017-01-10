'use strict';

const config = require('../config.js');
const store = require('../store.js');

const getOneProduct = (productId) =>
    $.ajax ({
    url: config.host + '/products/' + productId,
    method: 'GET'
  });


const getAllProducts = () =>
    $.ajax ({
    url: config.host + '/products',
    method: 'GET',
  });

const addItem = function (data){
  return new Promise((resolve, reject) => {
    return $.ajax ({
      url: config.host + '/items',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + store.user.token,
      },
      data,
      success: (response) => {
        resolve(response);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

const getItems = () =>
    $.ajax ({
    url: config.host + '/items',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    }
  });

const deleteItem = (id) =>
  // console.log(store.user);
    $.ajax ({
    url: config.host + '/items/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    }
  });

const updateItem = (itemId, data) =>
    $.ajax ({
    url: config.host + '/items/' + itemId,
    method: 'PATCH',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    }
  });

const getOrderHx = (data) =>
    $.ajax ({
    url: config.host + '/orders',
    method: 'GET',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    }
  });

const createOrderHx = (data) =>
    $.ajax ({
    url: config.host + '/orders',
    method: 'POST',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    }
  });

  module.exports = {
    getOneProduct,
    getAllProducts,
    addItem,
    getItems,
    deleteItem,
    updateItem,
    getOrderHx,
    createOrderHx,
  };

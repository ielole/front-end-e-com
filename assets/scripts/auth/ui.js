'use strict';

const store = require('../store.js');


const clear = (modal) => {
    setTimeout(function() {
        $(modal).modal('hide');
    }, 1500);
    $(modal).on('hidden.bs.modal', function() {
        $(this).find("input,textarea,select").val('').end();
        $('.modal-success').text('');
    });
};


const signUpSuccess = function(signUpData) {
  $('#sign-up').trigger('reset');
  $('.signup-messages').html('You may Login now.');
  clear('#signUpModal');
  return signUpData;
};

const signUpFailure = function() {
  $('.signup-messages').html('Oops, something went wrong, trying signing up again.');
  $('#sign-up').trigger('reset');
};

const signInSuccess = function(data) {
  // console.log(data.user);
  // $('.cart-add').show();
  store.user = data.user;
  store.user.id = data.user._id;
  // console.log(store.user);
$('#sign-in').trigger('reset');
// console.log('You\'ve successfully signed in!');
// $('#signInModal').hide(2000);
// $('#authModal').hide();
// show sign out button, change password buttons, view cart buttons
$('.signed-in').show();
// $('.modal-message').html('');
$('.signed-out').hide();
$('#cart-button').hide();
$('#checkout-button').hide();
$('.signout-messages').html('');
$('.signin-messages').html('You have logged in!');
$('.ufm-single-product').html('');
clear('#signInModal');
};

const signInFailure = function() {
$('.signin-messages').html('Oops, something went wrong, try signing in again.');
$('#sign-in').trigger('reset');
};

const changePasswordSuccess = function() {
$('#change-password').trigger('reset');
$('.changepw-messages').html('You\'ve successfully changed your password.');
clear('#changePasswordModal');
};

const changePasswordFailure = function() {
$('.changepw-messages').html('Oops, something went wrong, trying changing your password again.');
};

const signOutSuccess = function() {
  // replace message div content with ('')?
  $('.signout-messages').html('You have successfully signed out.');
  // show sign in and sign up buttons
  $('.signed-in').hide();
  $('.signed-out').show();
  $('#order-history').empty();
  clear('#signOutModal');
  $('.signup-messages').html('');
  $('.signin-messages').html('');
  $('.modal-message').html('Please Sign-In To Add Watch to Cart');
};

const failure = function() {
$('#sign-out-modal-messages').html('Oops, something went wrong.');
};


module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  failure,
};

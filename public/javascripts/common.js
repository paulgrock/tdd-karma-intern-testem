require.config({
  baseUrl: '/javascripts',
  paths: {
    jquery: '../vendor/jquery/jquery',
    lodash: '../vendor/lodash/lodash'
  }
});

//files to include on ALL client side paths
require([
  'basket',
  'item'
], function (Basket, item) {
  'use strict';
});

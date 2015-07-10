/* adobe-creative-ng.js / v1.0.0 / (c) 2015 Massimiliano Sartoretto / MIT Licence */

'format amd';
/* global define */

(function () {
  'use strict';

  function adobeCreativeNg(angular, adobeCreativeSDK) {

    return angular.module('adobeCreativeNG', [])

      .directive('adobe-creative', ['$window', function ($window) {

        return function (scope, element, attr) {

        };
      })
  }
})();

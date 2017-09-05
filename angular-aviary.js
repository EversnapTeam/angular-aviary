/*
	angular-aviary v0.6.0
	(c) 2016 Massimiliano Sartoretto <massimilianosartoretto@gmail.com>
	License: MIT
*/

'format amd';
/* global define */

(function () {
  'use strict';

  function ngAviary(angular, Aviary) {

    ngAviaryDirective.$inject = ['ngAviary'];
    function ngAviaryDirective(ngAviary) {
      return {
        restrict: 'A',
        scope: {
          targetSelector: '@',
          targetSrc: '@',
          onSave: '&',
          onSaveButtonClicked: '&',
          onClose:  '&'
        },
        link: function (scope, element, attrs) {

          element.bind('click', function(e) {
            e.preventDefault();
            return launchEditor();
          });

          // Callbacks obj
          var cbs = {
            onSaveButtonClicked: onSaveButtonClickedCb,
            onSave: onSaveCb,
            onError: onErrorCb,
            onClose: onCloseCb
          };

          var featherEditor = new Aviary.Feather(
            angular.extend({}, ngAviary.configuration, cbs)
          );

          function launchEditor() {
            var targetImage = window.document.querySelector(scope.targetSelector);            

            featherEditor.launch({
              image: targetImage,
              url: scope.targetSrc || targetImage.src
            });
            return false;
          }

          function onSaveButtonClickedCb(imageID) {
            var canvasId = ngAviary.configuration.adobeCanvasSelector || '#avpw_canvas_element';
            var canvas = angular.element(document.querySelector(canvasId))[0];

            // User onSaveButtonClicked callback
            return (scope.onSaveButtonClicked || angular.noop)({ id: imageID, canvas: canvas, featherEditor: featherEditor });
          }

          function onSaveCb(imageID, newURL) {
            // User onSave callback
            (scope.onSave || angular.noop)({
              id: imageID,
              newURL: newURL
            });

            if(scope.closeOnSave || ngAviary.configuration.closeOnSave){
              featherEditor.close();
            }
          }

          function onErrorCb(errorObj) {
            // User errback
            (scope.onError || angular.noop)({
              error: errorObj
            });
          }

          function onCloseCb(isDirty) {
            // User onClose callback
            (scope.onClose || angular.noop)({
              isDirty: isDirty
            });
          }
        }
      };
    }

    function ngAviaryProvider(){
      /* jshint validthis:true */

      var defaults = {
        apiKey: null
      };

      var requiredKeys = [
        'apiKey'
      ];

      var config;

      this.configure = function(params) {
        // Can only be configured once
        if (config) {
          throw new Error('Already configured.');
        }

        // Check if it is an `object`
        if (!(params instanceof Object)) {
          throw new TypeError('Invalid argument: `config` must be an `Object`.');
        }

        // Extend default configuration
        config = angular.extend({}, defaults, params);

        // Check if all required keys are set
        angular.forEach(requiredKeys, function(key) {
          if (!config[key]) {
            throw new Error('Missing parameter:', key);
          }
        });

        return config;
      };

      this.$get = function() {
        if(!config) {
          throw new Error('ngAviary must be configured first.');
        }

        var getConfig = (function() {
          return config;
        })();

        return {
          configuration: getConfig
        };
      };
    }

    return angular
      .module('ngAviary', [])
      .directive('ngAviary', ngAviaryDirective)
      .provider('ngAviary', ngAviaryProvider);
  }

  if (typeof define === 'function' && define.amd) {
		define(['angular', 'Aviary'], ngAviary);
	} else if (typeof module !== 'undefined' && module && module.exports) {
		ngAviary(angular, require('Aviary'));
		module.exports = 'ngAviary';
	} else {
		ngAviary(angular, (typeof global !== 'undefined' ? global : window).Aviary);
	}
})();

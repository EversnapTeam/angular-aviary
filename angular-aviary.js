/*
	angular-aviary v0.2.0
	(c) 2015 Massimiliano Sartoretto <massimilianosartoretto@gmail.com>
	License: MIT
*/

'format amd';
/* global define */

(function () {
  'use strict';

  function ngAviary(angular, Aviary) {

    return angular.module('ngAviary', [])

      .directive('ngAviary', ['ngAviary', function (ngAviary) {

        return {
          restrict: 'E',
          template: '<input type="image"/>',
          replace: true,
          scope: {
            target: '@',
            onSave: '&',
            onSaveButtonClicked: '&'
          },
          link: function (scope, element, attrs) {

            element.bind('click', function () {
              return launchEditor(scope.target, srcById(scope.target));
            });

            // Callbacks obj
            var cbs = {
              onSaveButtonClicked: onSaveButtonClickedCb,
              onSave: onSaveCb,
              onError: onErrorCb,
              onClose: onCLoseCb
            };

            var featherEditor = new Aviary.Feather(
              angular.extend({}, ngAviary.configuration, cbs)
            );

            function launchEditor(id, src) {
              featherEditor.launch({
                image: id,
                url: src
              });
              return false;
            }

            function srcById(id) {
              return document.getElementById(id).src;
            }

            function onSaveButtonClickedCb(imageID) {
              // User onSaveButtonClicked callback
              (scope.onSaveButtonClicked || angular.noop)({id: imageID});
            }

            function onSaveCb(imageID, newURL) {
              var img = document.getElementById(imageID);
              img.src = newURL;

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
              throw new Error(errorObj.message);
            }

            function onCLoseCb(isDirty) {}
          }
        };
      }])

      .provider('ngAviary', function(){
        var defaults = {
          apiKey: null,
          theme: 'dark',
          tools: 'all'
        };

        var requiredKeys = [
          'apiKey'
        ];

        var config;

        this.configure = function(params) {
          // Can only be configured once.
          if (config) {
            throw new Error('Already configured.');
          }

          // Check if is an `object`.
          if (!(params instanceof Object)) {
            throw new TypeError('Invalid argument: `config` must be an `Object`.');
          }

          // Extend default configuration.
          config = angular.extend({}, defaults, params);

          // Check if all required keys are set.
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
      });
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

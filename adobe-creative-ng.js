/* adobe-creative-ng.js / v0.0.1 / (c) 2015 Massimiliano Sartoretto / MIT Licence */

'format amd';
/* global define */

(function () {
  'use strict';

  function adobeCreativeNg(angular, Aviary) {

    return angular.module('adobeCreativeNg', [])

      .directive('ngCreative', ['ngCreative', function (ngCreative) {

        return {
          restrict: 'AE',
          template: '<input type="image" ng-src="{{scope.src}}"/>',
          replace: true,
          scope: {
            appendTo: '@',
            closeOnSave: '@',
            target: '@',
            theme: '@',
            tools: '@',
            onSave: '&'
          },
          link: function (scope, element) {

            element.bind('click', function () {
              return launchEditor(scope.target, srcById(scope.target));
            });

            var featherEditor = new Aviary.Feather({
              apiKey: ngCreative.configuration.apiKey,
              theme: scope.theme || ngCreative.configuration.theme,
              tools: scope.tools || ngCreative.configuration.tools,
              appendTo: scope.appendTo || '',
              onSave: onSaveCb,
              onError: onErrorCb,
              onClose: onCLoseCb
            });

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

            function onSaveCb(imageID, newURL) {
              var img = document.getElementById(imageID);
              img.src = newURL;

              // User callback call
              (scope.onSave || angular.noop)({
                id:imageID,
                newURL: newURL
              });

              if(scope.closeOnSave || ngCreative.configuration.closeOnSave){
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

      .provider('ngCreative', function(){
        var defaults = {
          apiKey: null,
          theme: 'dark',
          tools: 'all',
          closeOnSave: false
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
            throw new Error('ngCreativeProvider must be configured first.');
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
		define(['angular', 'Aviary'], adobeCreativeNg);
	} else if (typeof module !== 'undefined' && module && module.exports) {
		adobeCreativeNg(angular, require('Aviary'));
		module.exports = 'adobeCreativeNg';
	} else {
		adobeCreativeNg(angular, (typeof global !== 'undefined' ? global : window).Aviary);
	}
})();

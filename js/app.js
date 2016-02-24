'use strict';

angular.module('demoApp', ['ngAviary'])
  .controller('demoCtrl', function ($scope, ngAviary) {
    $scope.onSaveButtonClicked = function(id) {
      console.log('The image #' + id + ' has not been saved yet');
    };

    $scope.onSave = function(id, newURL) {
      console.log('Edited image saved');
      document.getElementById(id).src = newURL;
      console.log('The new URL of image #' + id + ' is ' + newURL);
    };

    $scope.onError = function(error) {
      throw new Error(error.message);
    };
  })

  .config(['ngAviaryProvider', function(ngAviaryProvider){
    ngAviaryProvider.configure({
      apiKey: 'myApiKey',
      closeOnSave: true
    });

  }]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['demoApp']);
});

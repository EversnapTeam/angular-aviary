/*
	(c) 2015 Massimiliano Sartoretto <massimilianosartoretto@gmail.com>
	License: MIT
*/

describe('module ngAviary', function () {
	var $rootScope, $compile, $window, AdobeAviary, ngAviary, mockEditor;
	var imageElement = document.createElement('img');

  mockEditor = {
    launch: function(a){return false;}
  };

	beforeEach(module('ngAviary', function(ngAviaryProvider){
    ngAviaryProvider.configure({
      apiKey: 'my-awesome-api-key',
      theme: 'light'
    });
  }));

  beforeEach(function(){
    module(function($provide) {
      $provide.constant('Aviary', {
        Feather: jasmine.createSpy('Feather')
      });
    });
  });

	beforeEach(inject(function ($injector, $window) {
		$rootScope = $injector.get('$rootScope');
		$compile = $injector.get('$compile');
    $window = $injector.get('$window');
		ngAviary = $injector.get('ngAviary');

    // Mocking Aviary Global Object
    (function($window) {
      window = $window;
      spyOn(window.Aviary, 'Feather').and.returnValue(mockEditor);
      spyOn(window.document, 'querySelector').and.returnValue(imageElement);
      spyOn(mockEditor, 'launch');
    })();
	}));

	afterEach(function () {
		jasmine.clock().uninstall();
	});

	describe('ngAviary configuration', function () {
		it('should has an awesome api key', function () {
			expect(ngAviary.configuration.apiKey).toEqual('my-awesome-api-key');
		});

    it('should has the light theme active', function () {
			expect(ngAviary.configuration.theme).toEqual('light');
		});
  });

  describe('ngAviary directive', function() {
    var element, scope;

    beforeEach(inject(function($rootScope, $compile) {
      spyOn(document, 'getElementById').and.returnValue(imageElement);

      scope = $rootScope.$new();
      element = angular.element(
          '<ng-aviary target="42"></ng-aviary>');

      element = $compile(element)(scope);
      scope.$digest();
    }));

    it('should launch the Feather editor when clicked', function(){
      element.triggerHandler('click');
      expect(mockEditor.launch).toHaveBeenCalled();
    });
  });
});

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

		function compileElementAndClick(el, click) {
			el = el ? el : angular.element('<a target-selector="42" ng-aviary></a>');
      scope = $rootScope.$new();
      element = $compile(el)(scope);
      scope.$digest();
			if(click) {
				element.triggerHandler('click');
			}
		}

    beforeEach(function() {
      spyOn(document, 'getElementById').and.returnValue(imageElement);
    });

		describe('should launch the Feather editor', function() {
			it('when clicked', function(){
				compileElementAndClick(null, true);
	      expect(mockEditor.launch).toHaveBeenCalled();
	    });

			it('with target-selector by default', function() {
				compileElementAndClick(
					angular.element('<a target-selector="#42" ng-aviary></a>'), true
				);
				var paramsObj = {image: imageElement, url: imageElement.src};
				expect(mockEditor.launch).toHaveBeenCalledWith(paramsObj);
			});

			it('with target-src if provided', function(){
				compileElementAndClick(
					angular.element('<a target-selector=\'#42\'' +
															'target-src=\'towel.png\'' +
															'ng-aviary></a>'),
					true
				);
				var paramsObj = {image: imageElement, url: 'towel.png'};
	      expect(mockEditor.launch).toHaveBeenCalledWith(paramsObj);
	    });
		});
  });
});

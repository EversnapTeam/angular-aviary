# Angular Aviary SDK

An AngularJS directive for [the Creative SDK Image Editor UI component](https://creativesdk.adobe.com/docs/web/#/articles/gettingstarted/index.html).

Copyright © 2016, [Massimiliano Sartoretto](mailto:massimilianosartoretto@gmail.com)

Find me on:
[![alt text][1.1]][1]
[![alt text][2.1]][2]
[![alt text][6.1]][6]

[1.1]: http://i.imgur.com/tXSoThF.png (twitter icon with padding)
[2.1]: http://i.imgur.com/P3YfQoD.png (facebook icon with padding)
[6.1]: http://i.imgur.com/0o48UoR.png (github icon with padding)

[1]: http://www.twitter.com/___Sarto
[2]: http://www.facebook.com/profile.php?id=1549402605
[6]: http://www.github.com/m00s

Installation
------------

You can choose your preferred method of installation:
* Through bower: `bower install angular-aviary --save`
* Through npm: `npm install angular-aviary --save`
* Download from github: [angular-aviary.min.js](https://github.com/m00s/angular-adobe-creative/blob/master/angular-aviary.min.js)

Usage
---------

### Setup

1. Include the scripts: 

    1. the Creative SDK Image Editor script (`http` and `https` versions [available here](https://creativesdk.adobe.com/docs/web/#/articles/gettingstarted/index.html))
    1. `angular-aviary.min.js`

    Example:

    ```html
    <script src="http://feather.aviary.com/imaging/v3/editor.js"></script>
    <script src="bower_components/angular-aviary/angular-aviary.min.js"></script>
    ```

1. Add the module `ngAviary` as a dependency to your app module:

    ```js
    var myApp = angular.module('myapp', ['ngAviary']);
    ```

### Configuration

To configure the Image Editor, call the `ngAviaryProvider.configure()` method (e.g. inside your app's `config()` callback):

```js
myApp.config(function(ngAviaryProvider) {
  ngAviaryProvider.configure({
    apiKey: 'my-awesome-api-key',
    theme: 'light',
    tools: 'all'
  })
});
```

For the full list of config options, please refer to the [official docs](https://creativesdk.adobe.com/docs/web/#/articles/gettingstarted/index.html).

### ngAviary directive
Use the `ngAviary` directive to create a toggle that triggers the Image Editor.

Example:

```js
<a href="#"
   target-selector='<selector>'
   target-src='./image.png'
   on-save-button-clicked='onSaveButtonClicked(id)'
   on-save='onSave(id, newURL)'
   ng-aviary> Edit photo </a>
```

You can use the HTML element you prefer as long as it supports the **onClick** event. (For a list of supported elements, refer to the [onClick docs](http://www.w3schools.com/jsref/event_onclick.asp))

Options that allow you to handle the Creative SDK Image Editor flow:

|Attribute|Description|Required|
|:-------|:---------|:---------:|
|targetSelector|A string containing one or more CSS selector to query target image| :heavy_check_mark:
|targetSrc|A string containing the url of the target image| :heavy_multiplication_x:
|onSaveButtonClicked|Pass a function to be called before an image save happens, but after a user has clicked the save button, intending to save. | :heavy_multiplication_x:
|onSave|Pass a function to be called when the image save is complete.| :heavy_multiplication_x:
|onClose|Pass a function to be called when the editor is closed. `isDirty` parameter tells whether the editor was closed with unsaved changes.|:heavy_multiplication_x:
|onError|The API can notify you of errors and you have the option to notify the user. They are otherwise silent.|:heavy_multiplication_x:

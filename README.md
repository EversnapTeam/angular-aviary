# Angular Aviary SDK

AngularJS directive for [Aviary SDK](https://developers.aviary.com/).

Copyright © 2015, [Massimiliano Sartoretto](mailto:massimilianosartoretto@gmail.com)

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
-----
Include both [Aviary](http://feather.aviary.com/imaging/v2/editor.js) and angular-aviary.min.js in your application.

```html
<script src="http://feather.aviary.com/imaging/v2/editor.js"></script>
<script src="bower_components/angular-aviary/angular-aviary.min.js"></script>
```

Add the module `ngAviary` as a dependency to your app module:

```js
var myApp = angular.module('myapp', ['ngAviary']);
```

### Configuration

To configure the module call the `ngAviaryProvider.configure()` method (e.g. inside your app's config() callback):

```js
myApp.config(function(ngAviaryProvider) {
  ngAviaryProvider.configure({
    apiKey: 'my-awesome-api-key',
    theme: 'light',
    tools: 'all'
  })
});
```

For the config options please refer to the [official docs](https://developers.aviary.com/docs/web/setup-guide)

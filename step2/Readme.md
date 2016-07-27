# Pip.WebUI Getting Started <br/> Step 2. Include pip-webui components

###### In [previous step](https://github.com/pip-webui/pip-webui-sample/blob/master/step1/Readme.md) we described how to create structure for your application

##### Let's include pip-webui components:

Add links to external libraries and pip-webui components `.css` files in your `index.html`

```markup
<link rel="stylesheet" href="../lib/pip-webui-lib.css"/>
<link rel="stylesheet" href="../lib/pip-webui.css"/>
```

Add links to external libraries and pip-webui components `.js` files in your `index.html`

```markup
<script src="../lib/pip-webui-lib.js"></script>
<script src="../lib/pip-webui.js"></script>
```

Initialize **angular module** in your `index.js` and add links to all pipWebUI modules

```javascript
var thisModule = angular.module('pipWebUISampleModule', [
        // pipWebUI modules
        'pipCore', 'pipRest', 'pipData', 'pipEntry', 'pipControls', 'pipLayout', 'pipNav',
        'pipLocations', 'pipPictures', 'pipDocuments', 'pipComposite', 'pipGuidance',
        'pipSettings', 'pipUserSettings', 'pipErrorHandling', 'pipSupport'
]);
```

Add **angular config** in your `index.js`

```javascript
thisModule.config(function () {
        
});
```

Add **angular controller** in your `index.js`

```javascript
thisModule.controller('pipWebUISampleController', function($scope) {
        
});
```

Add `ng-app` and `ng-controller` attributes to `body` tag in your `index.html`

```markup
<body ng-app="pipWebUISampleModule" ng-controller="pipWebUISampleController">
```

###### In [next step](https://github.com/pip-webui/pip-webui-sample/blob/master/step3/Readme.md) we will describe how to configure navigation in your application using pip-webui components
# Pip.WebUI Getting Started <br/> Step 2. Include pip.WebUI components

[Go to step 1](https://github.com/pip-webui/pip-webui-sample/blob/master/step1/) to create structure for your application.

### Add Pip.WebUI libraries:

Add links to external libraries and pip.WebUI components **.css** files in your **index.html**

```html 
<link rel="stylesheet" href="../lib/pip-webui-lib.css"/>
<link rel="stylesheet" href="../lib/pip-webui.css"/>
```

Add links to external libraries and pip.WebUI components **.js** files in your **index.html**

```html
<script src="../lib/pip-webui-lib.js"></script>
<script src="../lib/pip-webui.js"></script>
```

### Create Angular boilerplate code

Initialize **angular module** in your **index.js** and add links to all pip.WebUI modules

```javascript
var thisModule = angular.module('pipWebUISampleModule', [
        // pipWebUI modules
        'pipCore', 'pipRest', 'pipData', 'pipEntry', 'pipControls', 'pipLayout', 'pipNav',
        'pipLocations', 'pipPictures', 'pipDocuments', 'pipComposite', 'pipGuidance',
        'pipSettings', 'pipUserSettings', 'pipErrorHandling', 'pipSupport', 'pipHelp'
]);
```

Add **angular config** in your **index.js**

```javascript
thisModule.config(function () {
        
});
```

Add **angular controller** in your **index.js**

```javascript
thisModule.controller('pipWebUISampleController', function($scope) {
        
});
```

Add **ng-app** and **ng-controller** attributes to **body** tag in your **index.html**

```html
<body ng-app="pipWebUISampleModule" ng-controller="pipWebUISampleController">
```

### Continue

[Go to step 3](https://github.com/pip-webui/pip-webui-sample/blob/master/step3/) to configure navigation in your application using pip.WebUI components.
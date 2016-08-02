# Pip.WebUI Getting Started <br/> Step 2. Include pip-webui components

[Go to step 1](https://github.com/pip-webui/pip-webui-sample/blob/master/step1/) to create application structure.

### Add pip-webui references to CSS styles and javascript components

Add links to **pip-webui** CSS styles in **index.html**

```html 
<link rel="stylesheet" href="pip-webui-lib.css"/>
<link rel="stylesheet" href="pip-webui.css"/>
```

Below add **pip-webui** javascript files

```html
<script src="pip-webui-lib.js"></script>
<script src="pip-webui.js"></script>
```

### Write Angular boilerplate code

Initialize angular module in **index.js** and reference pip-webui modules

```javascript
var app = angular.module('app', [
        // pipWebUI modules
        'pipCore', 'pipRest', 'pipData', 'pipEntry', 'pipControls', 'pipLayout', 'pipNav',
        'pipLocations', 'pipPictures', 'pipDocuments', 'pipComposite', 'pipGuidance',
        'pipSettings', 'pipUserSettings', 'pipErrorHandling', 'pipSupport', 'pipHelp',
        
        // Application templates
        'app.Templates'
]);
```

Below add application configuration and controller:

```javascript
app.config(function () {
        // Todo: Add application configuration here     
});

app.controller('appController', function($scope) {
        // Todo: Add controller logic        
});
```

Add **ng-app** and **ng-controller** attributes to **body** tag inside **index.html**

```html
<body ng-app="app" ng-controller="appController">
```

### Continue

[Go to step 3](https://github.com/pip-webui/pip-webui-sample/blob/master/step3/) to add navigation into the application.

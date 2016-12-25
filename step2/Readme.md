# Pip.WebUI Getting Started <br/> Step 2. Add angular components

[Go to step 1](https://github.com/pip-webui/pip-webui-sample/blob/master/step1/) to create the application structure.

### Load CSS styles and javascript libraries

Add into **index.html** links to **pip-webui** that contain angular and angular-material libraries. Then add **pip-webui-sample** CSS styles and compiled javascript code.

In the application we are going to use Google Maps. So we'll add a link to Google Maps libraries as well:

```html 
<head>
    <meta charset="UTF-8">
    <title>Pip.WebUI Getting Started</title>
    <link rel="stylesheet" href="pip-webui-lib.css"/>
    <link rel="stylesheet" href="pip-webui.css"/>
    <link rel="stylesheet" href="pip-webui-sample.css"/>
    <script src="pip-webui-lib.js"></script>
    <script src="pip-webui.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyBg6cm-FDBFPWzRcn39AuSHGQSrdtVIjEo"></script>
    <script src="pip-webui-sample.js"></script>
</head>
```

### Add typescript definitions

To support typescript compilation add definitions for angular, angular material and other modules:

```bash
tsd init
tsd install jquery --save
tsd install lodash --save
tsd install async --save
tsd install angular --save
tsd install angular-material --save
tsd install angular-resource --save
tsd install angular-ui-router --save
```

Open **typings/tsd.d.ts** and add the following line:
```javascript
/// <reference path="../node_modules/pip-webui-all/dist/pip-webui.d.ts" />
```

### Write Angular boilerplate code

Add angular module, configuration and controller into **index.ts**:

```javascript
var app = angular.module('app', [
    // Add references here
]);

app.config(function() {
    // Todo: Add application configuration
});

app.controller('appController', function($scope) {
    $scope.greeting = "";
    
    $scope.saySomething = function() {
        $scope.greeting = "Hello world!";
    }
});
```

Add **ng-app** and **ng-controller** attributes to **body** tag inside **index.html**. Inside body place the following tags:

```html
<body ng-app="app" ng-controller="appController">
    <button ng-click="saySomething()">Say something</button>
    <p/>
    {{greeting}}
</body>
```

### Continue

[Go to step 3](https://github.com/pip-webui/pip-webui-sample/blob/master/step3/) to add pip-webui components.

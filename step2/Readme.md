# Pip.WebUI Getting Started <br/> Step 2. Add angular components

[Go to step 1](https://github.com/pip-webui/pip-webui-tutorial/blob/master/step1/) to create the application structure.

### Load CSS styles and javascript libraries

Add into **index.html** links to **pip-webui** that contain angular and angular-material libraries. Then add **pip-webui-tutorial** CSS styles and compiled javascript code.

In the application we are going to use Google Maps. So we'll add a link to Google Maps libraries as well:

```html 
<head>
    <meta charset="UTF-8">
    <title>Pip.WebUI Getting Started</title>
    <link rel="stylesheet" href="pip-webui-lib.css"/>
    <link rel="stylesheet" href="pip-webui.css"/>
    <link rel="stylesheet" href="pip-webui-tutorial.css"/>
    <script src="pip-webui-lib.js"></script>
    <script src="pip-webui.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyBg6cm-FDBFPWzRcn39AuSHGQSrdtVIjEo"></script>
    <script src="pip-webui-tutorial.js"></script>
</head>
```

### Add typescript definitions

To support typescript compilation add definitions for angular, angular material and other modules:

```bash
typings install dt~jquery --save --global
typings install lodash --save
typings install async --save
typings install dt~angular --save
typings install dt~angular-resource --save
typings install dt~angular-material --save
typings install dt~angular-ui-router --save
```

Open **typings/index.d.ts** and add the following line:
```javascript
/// <reference path="../node_modules/pip-webui-all/dist/pip-webui.d.ts" />
```

Note: currently dt~angular typings have issues. As a temporary workaround take typings from this github repository. Hopefully that shall be fixed soon.

### Write Angular boilerplate code

Add angular module, configuration and controller into **index.ts**:

```javascript
'use strict';

function configureApp() {
    // Todo: Add application configuration
}

class AppController {
    public greeting: string = "";
    
    public saySomething(): void {
        this.greeting = "Hello world!";
    }
};

angular
    .module('app', [
        // Add references here
    ])
    .config(configureApp)
    .controller('appController', AppController);
```

Add **ng-app** and **ng-controller** attributes to **body** tag inside **index.html**:

```html
<body ng-app="app" ng-controller="appController as vm">
    <button ng-click="vm.saySomething()">Say something</button>
    <p/>
    {{vm.greeting}}
</body>
```

#### Rebuild and launch the application

```bash
gulp build
gulp launch
```

After the build you shall see the following web page:

![Page 2](artifacts/page2.png)

### Continue

[Go to step 3](https://github.com/pip-webui/pip-webui-tutorial/blob/master/step3/) to add pip-webui components.

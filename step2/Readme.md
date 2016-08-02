# Pip.WebUI Getting Started <br/> Step 2. Include pip-webui components

[Go to step 1](https://github.com/pip-webui/pip-webui-sample/blob/master/step1/) to create application structure.

### Add pip-webui references to CSS styles and javascript components

Add links to **pip-webui** CSS styles and javascript code inside **index.html**

```html 
<head>
        <link rel="stylesheet" href="pip-webui-lib.css"/>
        <link rel="stylesheet" href="pip-webui.css"/>
        <script src="pip-webui-lib.js"></script>
        <script src="pip-webui.js"></script>
</head>
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

Below add empty configuration section and application controller

```javascript
app.config(function() {
        // Todo: Add configuration for the application
});

app.controller('appController', function($scope) {
        // Todo: Add controller logic for application
});
```

Add **ng-app** and **ng-controller** attributes to **body** tag inside **index.html**.
Then under **body** include **pip-main** and **pip-main-body** tags that designate the main application containers.

```html
<body ng-app="app" ng-controller="appController">
  <pip-main>
        <pip-main-body ui-view></pip-main-body>
  </pip-main>
</body>
```

## Define two custom pages

In this application we are going to have two custom pages. The first page will show a list of IoT nodes that measure
environmental polution. On the second page we'll display events that come from those IoT nodes.

Add empty controllers for nodes and events pages inside **index.js**

```javascript
app.controller('nodesController', function($scope) {
        // Todo: Add controller logic for IoT Nodes page
});

app.controller('eventsController', function($scope) {
        // Todo: Add controller logic for IoT Events page
});
```

Configure routing states for the pages inside configuration section

```javascript
app.config(function(pipAuthStateProvider) {
     // Configure states of application
     pipAuthStateProvider
        .state('nodes', {
            url: '/nodes',
            controller: 'nodesController',
            auth: true
        })
        .state('events', {
            url: '/events',
            controller: 'eventsController',
            auth: true
        });
});     
```

### Continue

[Go to step 3](https://github.com/pip-webui/pip-webui-sample/blob/master/step3/) to add navigation into the application.

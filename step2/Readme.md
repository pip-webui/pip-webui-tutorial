# Pip.WebUI Getting Started <br/> Step 2. Include pip-webui components

[Go to step 1](https://github.com/pip-webui/pip-webui-sample/blob/master/step1/) to create the application structure.

### Add pip-webui references to CSS styles and javascript components

Add links to **pip-webui**, application CSS styles and javascript code inside **index.html**.

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
        <script src="pip-webui-lib-test.js"></script>
        <script src="http://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyBg6cm-FDBFPWzRcn39AuSHGQSrdtVIjEo"></script>
        <script src="pip-webui-sample.js"></script>
</head>
```

### Write Angular boilerplate code

Initialize angular module in **index.js** and reference pip-webui modules:

```javascript
var app = angular.module('app', [
        // pipWebUI modules
        'pipRest', 'pipLayout', 'pipErrorHandling', 'pipWebuiTests',
        
        // Application templates
        'app.Templates'
]);
```

Below add the following empty configuration section and application controller:

```javascript
app.config(function() {
        // Todo: Add configuration for the application
});
```

In this application we are going to have two custom pages. The first page will show a list of IoT nodes that measure
environmental polution. On the second page we'll display events that come from those IoT nodes.

We need to get data on nodes and events. In pipWebuiTests have data generators that will allow us to obtain the necessary data.
To do this, create a data set $ scope.dataSet = pipTestDataService.createTestDataset ().
After that, we require two collections (**'NodesTestCollection' and 'EventsTestCollection'**) will be created in the $scope.dataSet.

app.controller('appController', function($scope, pipTestDataService) {
        // Create test data using pipWebUI services
        $scope.dataSet = pipTestDataService.createTestDataset();
});
```

Add **ng-app** and **ng-controller** attributes to **body** tag inside **index.html** and under **body** include **pip-main** and **pip-main-body** tags 
that designate the main application containers:

```html
<body ng-app="app" ng-controller="appController">
  <pip-main>
        <pip-main-body ui-view>
                Nothing here yet!
        </pip-main-body>
  </pip-main>
</body>
```

## Define two custom pages

Add empty controllers for nodes and events pages inside **index.js**:

```javascript
app.controller('nodesController', function($scope) {
        // Todo: Add controller logic for IoT Nodes page
});

app.controller('eventsController', function($scope) {
        // Todo: Add controller logic for IoT Events page
});
```

Configure routing states for the pages inside the configuration section:

```javascript
app.config(function(pipAuthStateProvider) {
     // Configure states of application
     pipAuthStateProvider
        .state('nodes', {
            url: '/nodes',
            controller: 'nodesController',
            template: '<h1>Nodes Page</h1>',
            auth: true
        })
        .state('events', {
            url: '/events',
            controller: 'eventsController',
            template: '<h1>Events Page</h1>',
            auth: true
        });
});     
```

### Continue

[Go to step 3](https://github.com/pip-webui/pip-webui-sample/blob/master/step3/) to add navigation into the application.

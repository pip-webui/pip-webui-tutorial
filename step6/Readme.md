# Pip.WebUI Getting Started <br/> Step 6. Add Nodes page with tiles view

[Go to step 5](https://github.com/pip-webui/pip-webui-sample/blob/master/step5/) to add settings, feedback and help pages.

### Create nodes tiles view

Create **/nodes** folder under **/src**. Place there **nodes.html** file with the content below.
It will display a tile view with IoT nodes showing their name, measurements and current location

```html
<pip-tiles class="layout-fill pip-no-tabs" column-width="440">
    <div class="masonry-brick pip-tile w440-flex " ng-repeat="node in nodes">
        <div class="p16">
            <h2 class="pip-title tm0">{{ node.name }}</h2>
            <div class="layout-row">
                <div class="layout-column flex">
                    <div class="flex color-secondary-text">Temperature</div>
                    <div class="flex text-subhead2">{{ node.temperature }}</div>
                </div>
                <div class="layout-column flex">
                    <div class="flex color-secondary-text">Radiation level</div>
                    <div class="flex text-subhead2">{{ node.radiation_level }}</div>
                </div>
            </div>
        </div>
        <div class="pip-tile-location-container">
            <pip-location-map pip-location-pos="location_points[$index]" pip-icon-path="iconPath"
                              pip-stretch="true" class="h-stretch">
            </pip-location-map>
        </div>
    </div>
</pip-tiles>
<md-button class="md-fab md-accent md-fab-bottom-right" aria-label="refresh">
    <md-tooltip md-direction="left">Refresh</md-tooltip>
    <md-icon md-svg-icon="icons:reload"></md-icon>
</md-button>
```

### Create nodes controller

Create **nodes.js** file under **/src/nodes** folder and copy the following code there

Todo: Each node shall have its own location!
Todo: Can we add the hook to resize tiles into the framework?

```javascript
(function (angular) {

    var thisModule = angular.module('nodesModule', []);

    thisModule.controller('nodesController', function($scope, pipAppBar) {
        // Show page title
        pipAppBar.showTitleText('Nodes');
        // Show menu icon to open sidenav
        pipAppBar.showMenuNavIcon();
        // Show local page actions
        pipAppBar.showLocalActions();
        // Add shadow under the appbar
        pipAppBar.showShadow();

        $scope.nodes = [
            {name: 'Node 1', temperature: '20 deg', radiation_level: '1.28 msv'},
            {name: 'Node 2', temperature: '25 deg', radiation_level: '5.00 msv'},
            {name: 'Node 3', temperature: '18 deg', radiation_level: '11.01 msv'},
            {name: 'Node 4', temperature: '21 deg', radiation_level: '0.78 msv'},
            {name: 'Node 5', temperature: '14 deg', radiation_level: '0.98 msv'},
            {name: 'Node 6', temperature: '16 deg', radiation_level: '19.45 msv'},
            {name: 'Node 7', temperature: '18 deg', radiation_level: '3.24 msv'},
            {name: 'Node 8', temperature: '19 deg', radiation_level: '1.56 msv'},
            {name: 'Node 9', temperature: '26 deg', radiation_level: '0.98 msv'},
            {name: 'Node 10', temperature: '23 deg', radiation_level: '4.57 msv'}
        ];
        
        $scope.iconPath = 'M0,15a15,15 0 1,0 30,0a15,15 0 1,0 -30,0';
        
        $scope.location_points = [{
            type: 'Point',
            coordinates: [32.413603, -110.982593],
            fill: '#FFD54F'
        }, {
            type: 'Point',
            coordinates: [55.393603, -120.982593]
        }, {
            type: 'Point',
            coordinates: [8.155443, 77.625688],
            fill: '#FFD54F'
        }, {
            type: 'Point',
            coordinates: [56.286074, 119.312690],
            fill: '#8BC34A'
        }, {
            type: 'Point',
            coordinates: [33.520236, 135.684374]
        }, {
            type: 'Point',
            coordinates: [64.720681, -14.321345],
            fill: '#FFD54F'
        }, {
            type: 'Point',
            coordinates: [-34.673479, 19.983090]
        }, {
            type: 'Point',
            coordinates: [-25.368410, 45.377503],
            fill: '#FFD54F'
        }, {
            type: 'Point',
            coordinates: [12.480935, 53.872444],
            fill: '#8BC34A'
        }, {
            type: 'Point',
            coordinates: [-42.595210, -63.641692]
        }];
    });

})(window.angular);
```

### Add page into the application

Add **nodesModule** into application module references in **index.js**

```javascript
var app = angular.module('app', [
    ...
    
    // Sample application modules
    'nodesModule'
]);
```

Make changes to the routing states in configuration section

```javascript
app.config(
    function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider, pipAuthStateProvider, 
              pipSettingsProvider, pipHelpProvider, $urlRouterProvider) {
        ...
        // Configure routing states
        pipAuthStateProvider
            .state('nodes', { // <---- Pay attention!
                url: '/nodes', // <---- Pay attention!
                controller: 'nodesController', // <---- Pay attention!
                templateUrl: 'nodes/nodes.html', // <---- Pay attention!
                auth: true
            })
            .state('events', {
                url: '/events',
                controller: 'eventsController',
                auth: true
            });
        ...
    }
);
```

Remove old **nodesController** from **index.js**

```javascript
// Remove
//app.controller('nodesController', function($scope) {
//        // Todo: Add controller logic for IoT Nodes page
//});
```

Rebuild and reopen the application. You shall see now

Todo: Update the picture to remove that "special tile"

![IoT nodes](artifacts/tiles_view.png)

Resize the window and see those the page responses to fit the smaller screen

![IoT nodes mobile](artifacts/tiles_view_mobile.png)

### Continue

[Go to step 7](https://github.com/pip-webui/pip-webui-sample/blob/master/step7/) to add Events page with table view

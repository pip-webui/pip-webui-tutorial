# Pip.WebUI Getting Started <br/> Step 9. Add map view to Nodes page

[Go to step 8](https://github.com/pip-webui/pip-webui-sample/blob/master/step8/) to show notifications.

### Create nodes map view

Rename **/src/nodes/nodes.html** file to **/src/nodes/nodes_tiles.html**

Create **/src/nodes/nodes_map.html** and copy there the content below

```html
<pip-simple class="layout-row flex">
    <pip-location-map class="flex" pip-location-pos="location_point" pip-draggable="true" pip-stretch="true">
    </pip-location-map>
</pip-simple>
```

### Create nodes tiles controller

After we splitted the Nodes page into tile and map views the  **nodesController** will become a parent controller for all views.
Then we need to add two more child controllers **nodesTilesController** and **nodesMapController** for each view.

Make changes in the **/src/nodes/nodes.js** file

```javascript

thisModule.controller('nodesController', function($scope, pipAppBar, $state) {
    ...

    // Show primary action to switch between views
    pipAppBar.showLocalActions([
        {
            name: isTilesView() ? 'nodes.map': 'nodes.tiles',
            icon: isTilesView() ? 'icons:location': 'icons:grid',
            callback: toggleView
        }
    ]);

    function isTilesView() {
        return $state.current.name === 'nodes.tiles';
    }

    function toggleView() {
        $state.go(isTiles() ? 'nodes.map': 'nodes.tiles');
    }
});

thisModule.controller('nodesTilesController', function($scope) {
    // Keep it empty
});

thisModule.controller('nodesMapController', function($scope) {
    // Keep it empty
});

```

## Update application routes

Open **index.js** and in configuration section make changes to nodes route states

```javascript
app.config(
        function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider, pipAuthStateProvider, 
                  pipSettingsProvider, pipHelpProvider, $urlRouterProvider) {
        ...
        
        // Configure application route states
        pipAuthStateProvider
            .state('nodes', { // <--- Pay attention!
                url: '/nodes', // <--- Pay attention!
                template: '<ui-view class="layout-row flex w-stretch"></ui-view>', // <--- Pay attention!
                abstract: true, // <--- Pay attention!
                controller: 'nodesController', // <--- Pay attention!
                auth: true // <--- Pay attention!
            })
            .state('nodes.tiles', { // <--- Pay attention!
                url: '/tiles', // <--- Pay attention!
                controller: 'nodesTilesController', // <--- Pay attention!
                templateUrl: 'nodes/nodes_tiles.html' // <--- Pay attention!
            })
            .state('nodes.map', { // <--- Pay attention!
                url: '/map', // <--- Pay attention!
                controller: 'nodesMapController', // <--- Pay attention!
                templateUrl: 'nodes/nodes_map.html' // <--- Pay attention!
            })
            .state('events', {
                url: '/events',
                controller: 'eventsController',
                templateUrl: 'events/events.html',
                auth: true
            });
         
        ...
});
```

After you made all the changes, rebuild the application. When you go to nodes page and toggle the view, you shall see the map with positions of IoT nodes.

Todo: change the data so all nodes are shown in different places of the map

![IoT Nodes map view](artifacts/map_view.png)

### Continue

[Go to step 10](https://github.com/pip-webui/pip-webui-sample/blob/master/step10/) to add charts view to Events page.

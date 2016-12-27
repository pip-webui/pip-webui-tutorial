# Pip.WebUI Getting Started <br/> Step 9. Add map view to Nodes page

[Go to step 8](https://github.com/pip-webui/pip-webui-sample/blob/master/step8/) to show notifications.

### Create nodes map view

Rename **/src/nodes/nodes.html** file to **/src/nodes/nodes_tiles.html**

Create **/src/nodes/nodes_map.html** and copy there the content below:

```html
<pip-simple class="layout-row flex">
    <pip-location-map class="flex" pip-location-positions="vm.locationPoints" pip-draggable="true" pip-stretch="true">
    </pip-location-map>
</pip-simple>
```

### Create nodes tiles and map controllers

After we split the Nodes page into tile and map views the  **nodesController** will become a parent controller for all views.
Then we need to add two more child controllers **nodesTilesController** and **nodesMapController** for each view.

Make changes in the **/src/nodes/nodes.ts** file. Change **nodesController**, add **nodesTilesController** and **nodesMapController**:

```javascript

'use strict';

...

class NodesController {
    public constructor(
        pipBreadcrumb: pip.nav.IBreadcrumbService
    ) {
        ...

        this.locationPoints = [
            this.nodes[0].location,
            this.nodes[1].location,
            this.nodes[2].location
        ];
    }

    public nodes: IoTNode[] = [];
    public locationPoints: Point[] = []; // <------- Pay attention!
}

class NodesTilesController {
    public constructor(
        pipActions: pip.nav.IActionsService,
        $state: angular.ui.IStateService
    ) {
        pipActions.primaryLocalActions = [
            {
                name: 'nodes.map',
                icon: 'icons:location',
                click: () => { $state.go('nodes.map'); },
                subActions: []
            }
        ];
    }
}

class NodesMapController {
    public constructor(
        pipActions: pip.nav.IActionsService,
        $state: angular.ui.IStateService,
        $timeout: any
    ) {
        pipActions.primaryLocalActions = [
            {
                name: 'nodes.tiles',
                icon: 'icons:grid',
                click: () => { $state.go('nodes.tiles'); },
                subActions: []
            }
        ];
    }
}

angular
    .module('app.Nodes', [ ])
    .config(configureNodeRoutes)
    .controller('nodesController', NodesController)
    .controller('nodesTilesController', NodesTilesController)// <------- Pay attention!
    .controller('nodesMapController', NodesMapController);// <------- Pay attention!

```

## Update application routes

Open **/src/nodes/nodes.ts** and in the configuration section make changes to nodes route states:

```javascript
'use strict';

function configureNodeRoutes(
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";

    // Configure module routes
    $stateProvider.state('nodes', {
        url: '/nodes',
        controller: NodesController,
        controllerAs: 'vm',
        template: '<ui-view class="layout-row flex w-stretch"></ui-view>', // <--- Pay attention!
        abstract: true // <--- Pay attention!
    })
    .state('nodes.tiles', { // <--- Pay attention!
        url: '/tiles', // <--- Pay attention!
        controller: NodesTilesController, // <--- Pay attention!
        templateUrl: 'nodes/nodes_tiles.html' // <--- Pay attention!
    })
    .state('nodes.map', { // <--- Pay attention!
        url: '/map', // <--- Pay attention!
        controller: NodesMapController, // <--- Pay attention!
        templateUrl: 'nodes/nodes_map.html' // <--- Pay attention!
    });
}
        ...
});
```

Because of state 'nodes' is abstract now, you need to change link to nodes tool in application configuration. 
Open **index.ts** and change state name of first link in the first section from 'nodes' to 'nodes.tiles'. Also change default state.

```javascript
'use strict';

...

function configApp(
    $mdIconProvider: ng.material.IIconProvider, 
    $urlRouterProvider,
    pipSideNavProvider: pip.nav.ISideNavProvider, 
    pipNavMenuProvider: pip.nav.INavMenuProvider, 
    pipAppBarProvider: pip.nav.IAppBarProvider, 
    pipNavIconProvider: pip.nav.INavIconProvider,
    pipActionsProvider: pip.nav.IActionsProvider, 
    pipBreadcrumbProvider: pip.nav.IBreadcrumbProvider, 
 ) {
 
 ...
 
 pipNavMenuProvider.sections = [
        {
            name: 'main',
            links: [
                { name: 'nodes', icon: 'icons:dashboard', title: 'Nodes', state: 'nodes.tiles' }, // <----------Pay attention!
                { name: 'events', icon: 'icons:action', title: 'Events', state: 'events' },
                { name: 'settings', icon: 'icons:config', title: 'Settings', state: 'settings.sample' }
            ]
        },
        {
            name: 'signout',
            links: [
                { name: 'signout', icon: 'icons:exit', title: 'Sign out', event: 'appSignout' }
            ]
        }
    ];
    
...
$urlRouterProvider.otherwise("/nodes/tiles"); // <---------------- Pay attention!

}

```

After you make all the changes, rebuild the application. When you go to the nodes page and toggle the view, you shall see a map with positions of IoT nodes:

![IoT Nodes map view](artifacts/map_view.png)

### Continue

[Go to step 10](https://github.com/pip-webui/pip-webui-sample/blob/master/step10/) to add charts view to Events page.

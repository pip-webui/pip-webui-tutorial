# Pip.WebUI Getting Started <br/> Step 9. Add map view to Nodes page

[Go to step 8](https://github.com/pip-webui/pip-webui-tutorial/blob/master/step8/) to show notifications.

### Create nodes map view

Rename **/src/nodes/nodes.html** file to **/src/nodes/nodes_tiles.html**
Then create **/src/nodes/nodes_map.html** file and place there HTML snippet below:

```html
<pip-simple class="layout-row flex">
    <pip-location-map class="flex" pip-location-positions="vm.locationPoints" pip-draggable="true" pip-stretch="true">
    </pip-location-map>
</pip-simple>
```

### Create nodes tiles and map controllers

After we split the Nodes page into tile and map views the  **nodesController** becomes a parent controller.
Then we shall add two child controllers **nodesTilesController** and **nodesMapController** for each view.

Make changes in the **/src/nodes/nodes.ts** file. Change **nodesController**, add **nodesTilesController** and **nodesMapController**:

```javascript

'use strict';

...

class NodesController {
    public constructor(
        pipBreadcrumb: pip.nav.IBreadcrumbService
    ) {
        ...

// Changes start here
        this.locationPoints = [
            this.nodes[0].location,
            this.nodes[1].location,
            this.nodes[2].location
        ];
// Changes end here
    }

    public nodes: IoTNode[] = [];
// Changes start here
    public locationPoints: Point[] = [];
// Changes end here
}

// Changes start here
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
// Changes end here

angular
    .module('app.Nodes', [ ])
    .config(configureNodeRoutes);

```

## Update application routes

Inside **/src/nodes/nodes.ts** file make changes to the nodes route configurations:

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
// Changes start here
        template: '<ui-view class="layout-row flex w-stretch"></ui-view>',
        abstract: true
// Changes end here
    })
// Changes start here
    .state('nodes.tiles', {
        url: '/tiles',
        controller: NodesTilesController,
        templateUrl: 'nodes/nodes_tiles.html'
    })
    .state('nodes.map', {
        url: '/map',
        controller: NodesMapController,
        templateUrl: 'nodes/nodes_map.html'
    });
// Changes end here
}
        ...
});
```

Because of state 'nodes' is abstract now, you need to change link to nodes tool in application configuration. 
Open **index.ts** and change state name of first link in the first section from 'nodes' to 'nodes.tiles'. Also change default state.

```javascript
'use strict';

...

function configureApp(
    $mdIconProvider: ng.material.IIconProvider, 
    $urlRouterProvider: any,
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
// Changes start here
                { name: 'nodes', icon: 'icons:grid', title: 'Nodes', state: 'nodes.tiles' },
// Changes end here
                { name: 'events', icon: 'icons:progress', title: 'Events', state: 'events' },
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
// Changes start here
    $urlRouterProvider.otherwise("/nodes/tiles");
// Changes end here
}

```

After all the changes are done, rebuild the application. When you go to the nodes page and toggle the view in the appbar, you shall see a map with positions of IoT nodes:

![IoT Nodes map view](artifacts/map_view.png)

### Continue

[Go to step 10](https://github.com/pip-webui/pip-webui-tutorial/blob/master/step10/) to add charts view to Events page.

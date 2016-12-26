# Pip.WebUI Getting Started <br/> Step 6. Add Nodes page with tiles view

[Go to step 5](https://github.com/pip-webui/pip-webui-sample/blob/master/step5/) to add settings pages.

### Create nodes tiles view

Replace content of **nodes.html** file with the content below.
It will display a tile view with IoT nodes showing their name, measurements and current location:

```html
<pip-tiles class="layout-fill pip-no-tabs" column-width="440">
    <div class="masonry-brick pip-tile w440-flex " ng-repeat="node in vm.nodes">
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
            <pip-location-map pip-location-pos="node.location" pip-icon-path="iconPath"
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

### Update nodes controller

Todo: Each node shall have its own location!
Todo: Can we add the hook to resize tiles into the framework?

Update **nodes.ts** file with the following code:

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
        templateUrl: 'nodes.html'
    });
}

class Point {
    type: string;
    coordinates: number[];
}

class IoTNode {
    public name: string;
    public temperature: number;
    public radiation_level: number;
    public location: Point;
}

class NodesController {
    public constructor(
        pipBreadcrumb: pip.nav.IBreadcrumbService
    ) {
        pipBreadcrumb.text = "Nodes";

        this.nodes = [
            { 
                name: 'Node 1', 
                temperature: 24, 
                radiation_level: 100,  
                location: { type: 'Point', coordinates: [32.393603, 110.982593] }
            },
            { 
                name: 'Node 1', 
                temperature: 24.5, 
                radiation_level: 104,  
                location: { type: 'Point', coordinates: [32.393603, -121.982593] }
            },
            { 
                name: 'Node 3', 
                temperature: 23, 
                radiation_level: 99,  
                location: { type: 'Point', coordinates: [32.393603, 120.982593] }
            }
        ];
    }

    public nodes: IoTNode[] = [];
}

angular
    .module('app.Nodes', [ ])
    .config(configureNodeRoutes)
    .controller('nodesController', NodesController);
```

Rebuild and reopen the application. You will see now:

![IoT nodes](artifacts/tiles_view.png)

Resize the window and see those the page responses to fit a smaller screen:

![IoT nodes mobile](artifacts/tiles_view_mobile.png)

### Continue

[Go to step 7](https://github.com/pip-webui/pip-webui-sample/blob/master/step7/) to add Events page with table view

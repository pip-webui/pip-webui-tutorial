# Getting Started With Pip.WebUI <br/> Step 6. Add tile view to the Nodes page

[Go to step 5](https://github.com/pip-webui/pip-webui-tutorial/blob/master/step5/) if you haven't already, to add the settings pages.

### Create the nodes tile view

Replace the content of the **nodes.html** file with this HTML snippet below.
It will display tiles with the IoT nodes showing their name, measurements and current location:

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

### Update the nodes controller

Replace the content of the **nodes.ts** file with the following code:

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
        templateUrl: 'nodes/nodes.html'
    });
}

export class Point {
    type: string;
    coordinates: number[];
}

export class IoTNode {
    public name: string;
    public temperature: number;
    public radiation_level: number;
    public location: Point;
}

export class NodesController {
    public constructor(
        pipNavService: pip.nav.INavService
    ) {
        pipNavService.appbar.show();
        pipNavService.sidenav.show();
        pipNavService.breadcrumb.text = "Nodes";

        this.nodes = [
            { 
                name: 'Node 1', 
                temperature: 24, 
                radiation_level: 100,  
                location: { type: 'Point', coordinates: [32.393603, 110.982593] }
            },
            { 
                name: 'Node 2', 
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
    .config(configureNodeRoutes);
```

Then, rebuild and reopen the application. Now you should see the following page:

![IoT nodes](artifacts/tiles_view.png)

After that, resize the window and you will see that the page responds to fit a smaller screen:

![IoT nodes mobile](artifacts/tiles_view_mobile.png)

### Continue to step 7

[Go to step 7](https://github.com/pip-webui/pip-webui-tutorial/blob/master/step7/) to add the table view to the Events page.

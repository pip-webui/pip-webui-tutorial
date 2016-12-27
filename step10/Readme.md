# Pip.WebUI Getting Started <br/> Step 10. Add charts view for Maintenance Events page

[Go to step 9](https://github.com/pip-webui/pip-webui-sample/blob/master/step8/) to add map view to Nodes page.

### Create events chart view

Rename **src/events/events.html** file to **src/events/events_list.html**

Create **src/events/events_chart.html** and put there the following markup:

```html
<md-toolbar class="pip-appbar-ext">
</md-toolbar>

<pip-document>
    <div class="pip-body p16">
        <h3>Temperature changes</h3>
        <pip-line-chart pip-series="vm.temperatureSerias" pip-x-tick-format="vm.formatXTick">
        </pip-line-chart>
        <h3>Radiation level changes</h3>
        <pip-line-chart pip-series="vm.radLevelSeria" pip-x-tick-format="vm.formatXTick">
        </pip-line-chart>
        <h3>Total statistics</h3>
        <pip-pie-chart pip-series="vm.totalSeria" pip-centered="true" pip-donut="true" pip-show-total="true">
        </pip-pie-chart>
    </div>
</pip-document>
```
### Create events list and chart controllers

Open **src/events/events.ts** and add the following code:

```javascript
'use strict';
...

class totalSeria {
    public label: string;
    public value: number;
}

class seriaValue {
    value: number;
    x: any
}

class timeSeria {
    public key: string;
    public values: seriaValue[];
}

class EventsListController {
    public constructor(
        pipActions: pip.nav.IActionsService,
        $state: angular.ui.IStateService
    ) {
        pipActions.primaryLocalActions = [
            {
                name: 'events.chart',
                icon: 'icons:pie-chart',
                click: () => { $state.go('events.chart'); },
                subActions: []
            }
        ];
    }
}

class EventsChartController {
    public constructor(
        pipActions: pip.nav.IActionsService,
        $state: angular.ui.IStateService,
        $timeout: any
    ) {
        pipActions.primaryLocalActions = [
            {
                name: 'events.list',
                icon: 'icons:list',
                click: () => { $state.go('events.list'); },
                subActions: []
            }
        ];

        this.totalSeria = [
            {label: 'Raised temperature', value: 2},
            {label: 'Lowered temperature', value: 1},
            {label: 'Change location', value: 1}
        ];

        this.temperatureSerias = [
            {
                key: 'Node 1 temperature',
                values: [
                    {
                        x: new Date(2016, 11, 1, 0),
                        value: 24.5
                    },
                    {
                        x: new Date(2016, 11, 2, 0),
                        value: 20.5
                    },
                    {
                        x: new Date(2016, 11, 3, 0),
                        value: 28.5
                    }
                ]
            },
            {
                key: 'Node 2 temperature',
                values: [
                    {
                        x: new Date(2016, 11, 1, 0),
                        value: 19.5
                    },
                    {
                        x: new Date(2016, 11, 2, 0),
                        value: 17
                    },
                    {
                        x: new Date(2016, 11, 3, 0),
                        value: 21.5
                    }
                ]
            }
        ];

        this.radLevelSeria = [
            {
                key: 'Node 1 radiation level',
                values: [
                    {
                        x: new Date(2016, 11, 1, 0),
                        value: 100
                    },
                    {
                        x: new Date(2016, 11, 2, 0),
                        value: 105
                    },
                    {
                        x: new Date(2016, 11, 3, 0),
                        value: 91
                    }
                ]
            },
            {
                key: 'Node 2 radiation level',
                values: [
                    {
                        x: new Date(2016, 11, 1, 0),
                        value: 102
                    },
                    {
                        x: new Date(2016, 11, 2, 0),
                        value: 95
                    },
                    {
                        x: new Date(2016, 11, 3, 0),
                        value: 112
                    }
                ]
            }
        ];
    }

    public totalSeria: totalSeria[] = [];
    public temperatureSerias: timeSeria[] = [];
    public radLevelSeria: timeSeria[] = [];

    // Format date of x axis
    public formatXTick(x) {
        let date = new Date(x);

        return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    }
}

angular
    .module('app.Events', [ ])
    .config(configureEventRoutes)
    .controller('eventsController', EventsController)
    .controller('eventsListController', EventsListController) // <------------- Pay attention!
    .controller('eventsChartController', EventsChartController); // <------------- Pay attention!

```

### Update application routes

Open **/src/nodes/events.ts** and in the configuration section make changes to events route states:

```javascript
'use strict';

function configureEventRoutes(
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";

    // Configure module routes
    $stateProvider.state('events', {
        url: '/events',
        controller: EventsController,
        controllerAs: 'vm',
        template: '<ui-view class="layout-row flex w-stretch"></ui-view>', // <---- Pay attention!
        abstract: true // <---- Pay attention!
    })
    .state('events.list', { // <---- Pay attention!
        url: '/list', // <---- Pay attention!
        controller: EventsListController, // <---- Pay attention!
        templateUrl: 'events/events_list.html' // <---- Pay attention!
    })
    .state('events.chart', { // <---- Pay attention!
        url: '/chart', // <---- Pay attention!
        controller: EventsChartController, // <---- Pay attention!
        controllerAs: 'vm', // <---- Pay attention!
        templateUrl: 'events/events_chart.html' // <---- Pay attention!
    });
}

...

```

### Add charts modules

Open **index.ts** and add charts and charts templates modules:

```javascript
angular
    .module('app', [
        'ngMaterial',
        'pipLayout', 
        'pipNav', 
        'pipControls',
        'pipBehaviors',
        'pipServices', 
        'pipTheme',
        'pipSettings',
        'pipButtons',
        'pipLocations',
        'pipCharts', // <---------------- Pay attention!
        'pipCharts.Templates', // <---------------- Pay attention!

        'app.Templates',
        'app.Events',
        'app.Nodes',
        'app.Settings.Sample',
        'app.Notifications'
    ])
    .config(configApp)
    .controller('appController', AppController);
```

### Add links to webui-optional

Open **index.html** and add links to webui-optional .css and .js files:

```html
...
<head>
<meta charset="UTF-8">
    <title>Pip.WebUI Getting Started</title>
    <link rel="stylesheet" href="pip-webui-lib.css"/>
    <link rel="stylesheet" href="pip-webui-lib-optional.css"/> <!-- Pay attention!  -->
    <link rel="stylesheet" href="pip-webui.css"/>
    <link rel="stylesheet" href="pip-webui-sample.css"/>
    <script src="pip-webui-lib.js"></script>
    <script src="pip-webui-lib-optional.js"></script> <!-- Pay attention!  -->
    <script src="pip-webui.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyBg6cm-FDBFPWzRcn39AuSHGQSrdtVIjEo"></script>
    <script src="pip-webui-sample.js"></script>
</head>
```

After all changes, rebuild application. When you go to the events page and toggle the view, you shall see a line charts with temperature and radition statistics and one pie chart with total information about numbers of events by type:

![Events charts](artifacts/charts.png)


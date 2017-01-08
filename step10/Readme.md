# Getting Started With Pip.WebUI <br/> Step 10. Add a charts view for the Maintenance Events page

[Go to step 9](https://github.com/pip-webui/pip-webui-tutorial/blob/master/step9/) if haven't already, to add the map view to Nodes page.

### Create the events chart view

Rename the **src/events/events.html** file to **src/events/events_list.html**.

Then, create **src/events/events_chart.html** and add the following HTML snippet:

```html
<md-toolbar class="pip-appbar-ext">
</md-toolbar>

<pip-document>
    <div class="pip-body p16">
        <h3>Temperature changes</h3>
        <pip-line-chart pip-series="vm.temperatureSerias" pip-x-tick-format="vm.formatXTick">
        </pip-line-chart>
        <h3>Radiation level changes</h3>
        <pip-line-chart pip-series="vm.radLevelSerias" pip-x-tick-format="vm.formatXTick">
        </pip-line-chart>
        <h3>Total statistics</h3>
        <pip-pie-chart pip-series="vm.totalSeria" pip-centered="true" pip-donut="true" pip-show-total="true">
        </pip-pie-chart>
    </div>
</pip-document>
```
### Create the events list and chart controllers

Open the **src/events/events.ts** file and add the code below:

```javascript
'use strict';
...

// >>>> Changes start here >>>>
class TotalSeries {
    public label: string;
    public value: number;
}

class SeriesValue {
    value: number;
    x: any
}

class TimeSeries {
    public key: string;
    public values: SeriesValue[];
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
        $scope: any
    ) {
        pipActions.primaryLocalActions = [
            {
                name: 'events.list',
                icon: 'icons:list',
                click: () => { $state.go('events.list'); },
                subActions: []
            }
        ];

        this.events = $scope.$parent.vm.events;
        this.totalSeries = this.generateTotal();
        this.temperatureSeries = this.generateTimeSeries('temperature');
        this.radLevelSeries = this.generateTimeSeries('rad_level');
    }

    private generateTotal(): TotalSeries[] {
        let series: TotalSeries[] = [
            {label: 'Raised temperature', value: 0},
            {label: 'Lowered temperature', value: 0},
            {label: 'Change location', value: 0}
        ];

        _.each(this.events, (event) => {
            let index = _.findIndex(series, (s) => { return s.label == event.description; });
            series[index].value++;
        });

        return series;
    }

    private generateTimeSeries(type: string): TimeSeries[] {
        let node_count = 2;
        let event_count = this.events.length;
        let series: TimeSeries[] = [];

        for (let i = 0; i < node_count; i++) {
            series.push({ key: 'Node ' + (i + 1), values:[] });
            for (let j = 0; j < event_count / node_count; j++) {
                series[i].values.push({
                    value: this.events[(event_count / node_count) * i + j][type], 
                    x: new Date(2016, 11, j + 1)
                });
            }
        }

        console.log(type);
        console.log(series);
        return series;
    }

    public events: IoTEvent[] = [];
    public totalSeries: TotalSeries[] = [];
    public temperatureSeries: TimeSeries[] = [];
    public radLevelSeries: TimeSeries[] = [];

    // Format date of x axis
    public formatXTick(x) {
        let date = new Date(x);

        return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    }
}
// >>>> Changes end here >>>>

angular
    .module('app.Events', [ ])
    .config(configureEventRoutes);
```

### Update the application routes

Open **/src/nodes/events.ts** and in the config section, make changes to the event route states:

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
// >>>> Changes start here >>>>
        template: '<ui-view class="layout-row flex w-stretch"></ui-view>',
        abstract: true
// >>>> Changes end here
    })
// >>>> Changes start here
    .state('events.list', {
        url: '/list',
        controller: EventsListController,
        templateUrl: 'events/events_list.html'
    })
    .state('events.chart', {
        url: '/chart',
        controller: EventsChartController,
        controllerAs: 'vm',
        templateUrl: 'events/events_chart.html'
    });
// >>>> Changes end here >>>>
}

...

```

### Add chart modules

Open **index.ts** and add the charts and charts templates modules:

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
// >>>> Changes start here >>>>
        'pipCharts', 
        'pipCharts.Templates', // To be removed
// >>>> Changes end here >>>>

        'app.Templates',
        'app.Events',
        'app.Nodes',
        'app.Settings.Sample',
        'app.Notifications'
    ])
    .config(configureApp)
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
<!-- >>>> Changes start here >>>> -->
    <link rel="stylesheet" href="pip-webui-lib-optional.css"/>
<!-- >>>> Changes end here >>>> -->
    <link rel="stylesheet" href="pip-webui.css"/>
    <link rel="stylesheet" href="pip-webui-tutorial.css"/>
    <script src="pip-webui-lib.js"></script>
<!-- >>>> Changes start here >>>> -->
    <script src="pip-webui-lib-optional.js"></script>
<!-- >>>> Changes end here >>>> -->
    <script src="pip-webui.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyBg6cm-FDBFPWzRcn39AuSHGQSrdtVIjEo"></script>
    <script src="pip-webui-tutorial.js"></script>
</head>
```

Because 'events' is now abstract, you need to change the link to the events tool in the app configuration. 
Open **index.ts** and change the state name of the first link in the first section from 'events' to 'events.list'.

```javascript
'use strict';

...

function configureApp(
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
                { name: 'nodes', icon: 'icons:grid', title: 'Nodes', state: 'nodes.tiles' },
// >>>> Changes start here >>>>
                { name: 'events', icon: 'icons:progress', title: 'Events', state: 'events.list' },
// >>>> Changes end here >>>>
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
}

```

After all the changes are done, rebuild the application. Then go to the events page and toggle the view.
Now you should see line charts with temperature and radition statistics and one pie chart with the total number of events by type:

![Events charts](artifacts/charts.png)

todo: add conclusion paragraph
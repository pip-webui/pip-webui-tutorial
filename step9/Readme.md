# Pip.WebUI Getting Started <br/> Step 9. Add map view for IoT Nodes page

[Go to step 8](https://github.com/pip-webui/pip-webui-sample/blob/master/step8/) to configure notifications in your application.

### Add special template to display map view to **/IoT_nodes** folder

##### IoT_nodes_map.html

```html
<pip-simple class="layout-row flex">
    <pip-location-map class="flex" pip-location-pos="location_point" pip-draggable="true" pip-stretch="true">
    </pip-location-map>
</pip-simple>
```

### Update your **index.js**

```javascript
thisModule.config(
        function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider, pipAuthStateProvider, 
                  pipSettingsProvider, pipHelpProvider, $urlRouterProvider) {
        ...
        
        // Configure states of application
        pipAuthStateProvider
            .state('iot_nodes', { // <--- Pay attention!
                url: '/iot_nodes', // <--- Pay attention!
                template: '<ui-view class="layout-row flex w-stretch"></ui-view>', // <--- Pay attention!
                abstract: true, // <--- Pay attention!
                auth: true // <--- Pay attention!
            })
            .state('iot_nodes.tiles', { // <--- Pay attention!
                url: '/tiles', // <--- Pay attention!
                controller: 'IoTNodesController', // <--- Pay attention!
                templateUrl: 'IoT_nodes/IoT_nodes_tiles.html' // <--- Pay attention!
            })
            .state('iot_nodes.map', { // <--- Pay attention!
                url: '/map', // <--- Pay attention!
                controller: 'IoTNodesController', // <--- Pay attention!
                templateUrl: 'IoT_nodes/IoT_nodes_map.html' // <--- Pay attention!
            })
            .state('maintenance_events', {
                url: '/maintenance_events',
                controller: 'maintenanceEventsController',
                templateUrl: 'maintenance_events/maintenance_events.html',
                auth: true
            });
         
        ...
});
```

### Update **IoTNodesController** 

```javascript

thisModule.controller('IoTNodesController', function($scope, pipAppBar, $state) {

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

        $scope.location_point = {
            type: 'Point',
            coordinates: [32.393603, -110.982593],
            name: 'Tucson'
        };

        pipAppBar.showTitleText('IoT Nodes'); // Show title of application or specific page
        pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
        pipAppBar.showShadow();

        pipAppBar.showLocalActions([ // Show actions of your application
            {
                name: isTiles() ? 'iot_nodes.map': 'iot_nodes.tiles',
                icon: isTiles() ? 'icons:location': 'icons:grid',
                callback: onChangeView
            }
        ]);

        function isTiles() {
            return $state.current.name === 'iot_nodes.tiles';
        }

        function onChangeView() {
            $state.go(isTiles() ? 'iot_nodes.map': 'iot_nodes.tiles');
        }
    });

```

After that you shall have two views in your IoT Nodes Module: **tiles** and **map**. To trig view click button in right corner of appbar.

Map view:

![IoT Nodes map view](artifacts/map_view.png)

### Continue

[Go to step 10](https://github.com/pip-webui/pip-webui-sample/blob/master/step10/) to add charts view for Maintenance Events page.
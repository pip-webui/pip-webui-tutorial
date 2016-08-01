# Pip.WebUI Getting Started <br/> Step 7. Add Maintenance Events page with table view

[Go to step 6](https://github.com/pip-webui/pip-webui-sample/blob/master/step6/) to add IoT Nodes page with tiles view to your application.

### Add special template and controller to display events in module of your application

In the **/src** create **maintenance_events** folder and create the following tree file inside.

##### maintenance_events.html

```html
<md-toolbar class="pip-appbar-ext">
</md-toolbar>

<pip-document>
    <div class="pip-body">
        <table class="table table-striped table-hover ">
            <thead>
            <tr>
                <th>Node id</th>
                <th>Description</th>
                <th>Temperature</th>
                <th>Radiation level</th>
            </tr>
            </thead>
            <tbody>
            <tr ng-repeat="event in events" ng-class="event.type">
                <td>{{ event.node_id }}</td>
                <td>{{ event.description }}</td>
                <td>{{ event.temperature }}</td>
                <td>{{ event.rad_level }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</pip-document>
```

##### maintenance_events.js

```javascript
(function (angular) {

    var thisModule = angular.module('maintenanceEventsModule', []);

    thisModule.controller('maintenanceEventsController', function($scope, pipAppBar) {

        $scope.events = [
            {node_id: '1', description: 'Thermal shock', temperature: '42 deg', rad_level: '0.77 msv', type: 'danger'},
            {node_id: '15', description: 'Temperature change', temperature: '16 deg', rad_level: '1.35 msv', type: 'info'},
            {node_id: '4', description: 'Radiation level increase', temperature: '22 deg', rad_level: '5.55 msv', type: 'warning'},
            {node_id: '3', description: 'Temperature dropped significantly', temperature: '-18 deg', rad_level: '0.11 msv', type: 'warning'},
            {node_id: '6', description: 'Eruption', temperature: '42 deg', rad_level: '0.22 msv', type: 'danger'},
            {node_id: '7', description: 'Thermal shock', temperature: '42 deg', rad_level: '0.77 msv', type: 'danger'},
            {node_id: '18', description: 'Temperature change', temperature: '16 deg', rad_level: '1.35 msv', type: 'info'},
            {node_id: '2', description: 'Radiation level increase', temperature: '22 deg', rad_level: '5.55 msv', type: 'warning'},
            {node_id: '22', description: 'Temperature dropped significantly', temperature: '-18 deg', rad_level: '0.11 msv', type: 'warning'},
            {node_id: '9', description: 'Eruption', temperature: '42 deg', rad_level: '0.22 msv', type: 'danger'}
        ];

        pipAppBar.showTitleText('Maintenance Events'); // Show title of application or specific page
        pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
        pipAppBar.showLocalActions(); // Show actions of your application
        pipAppBar.hideShadow();
    });

})(window.angular);
```

### Update your index.js

Connect **maintenance events** module to main module of application

```javascript
var thisModule = angular.module('pipWebUISampleModule', [
    ...
    
    // Sample application modules
    'IoTNodesModule', 'maintenanceEventsModule'
    
    ...
]);
```

Update **config**

```javascript
thisModule.config(
    function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider, pipAuthStateProvider, 
              pipSettingsProvider, pipHelpProvider, $urlRouterProvider) {
        ...

        // Configure states of application
        pipAuthStateProvider
            .state('iot_nodes', {
                url: '/iot_nodes',
                controller: 'IoTNodesController',
                templateUrl: 'IoT_nodes/IoT_nodes.html',
                auth: true
            })
            .state('maintenance_events', { // <---- Pay attention!
                url: '/maintenance_events', // <---- Pay attention!
                controller: 'maintenanceEventsController', // <---- Pay attention!
                templateUrl: 'maintenance_events/maintenance_events.html', // <---- Pay attention!
                auth: true
            });

        // Configure sidenav sections
        pipSideNavProvider.sections([
            {
                links: [
                    {title: 'IoT Nodes', url: '/iot_nodes'}, 
                    {title: 'Maintenance Events', url: '/maintenance_events'} // <---- Pay attention!
                ]
            },
            {
                links: [
                    {title: 'Help', url: '/help'},
                    {title: 'Settings', url: '/settings'},
                    {title: 'Sign Out', url: '/signout'}
                ]
            }
        ]);
        
        ...
    }
);
```

After all changes instead of module_2 state you should get **Maintenance Events**:

![Maintenance Events](artifacts/maintenance_events.png)

### Continue

[Go to step 8](https://github.com/pip-webui/pip-webui-sample/blob/master/step8/) to configure notifications in your application.
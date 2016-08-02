# Pip.WebUI Getting Started <br/> Step 7. Add Events page with table view

[Go to step 6](https://github.com/pip-webui/pip-webui-sample/blob/master/step6/) to add Nodes page with tiles view.

### Create events table view

Create **/events** folder under **/src**. Place there events.html file with the content presented below. 
The page will show events from IoT nodes as a table on Desktop and Table and as a list on Phones.

Todo: Make the page responsive. Add list on phones
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

### Create events controller

Create **events.js** file under **/src/events** folder and copy there the following code

```javascript
(function (angular) {

    var thisModule = angular.module('eventsModule', []);

    thisModule.controller('eventsController', function($scope, pipAppBar) {
        // Show page title
        pipAppBar.showTitleText('Events');
        // Show menu icon to open sidenav
        pipAppBar.showMenuNavIcon();
        // Show local page actions
        pipAppBar.showLocalActions();
        // Add shadow under the appbar
        pipAppBar.showShadow();

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
    });

})(window.angular);
```

### Add page into the application

Add **eventsModule** into application module references in index.js

```javascript
var app = angular.module('app', [
    ...
    
    // Sample application modules
    'nodesModule', 'eventsModule'
]);
```

Make changes to the routing states in configuration section

```javascript
app.config(
    function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider, pipAuthStateProvider, 
              pipSettingsProvider, pipHelpProvider, $urlRouterProvider) {
        ...

        // Configure states of application
        pipAuthStateProvider
            .state('nodes', {
                url: '/nodes',
                controller: 'nodesController',
                templateUrl: 'nodes/nodes.html',
                auth: true
            })
            .state('events', { // <---- Pay attention!
                url: '/events', // <---- Pay attention!
                controller: 'eventsController', // <---- Pay attention!
                templateUrl: 'events/events.html', // <---- Pay attention!
                auth: true
            });
        ...
    }
);
```

Remove old **eventsController** from **index.js**

```javascript
// Remove
//app.controller('eventsController', function($scope) {
//        // Todo: Add controller logic for IoT Events page
//});
```

Rebuild and reopen the application. You shall see now

![Maintenance Events](artifacts/maintenance_events.png)

Resize browser windows to the size of a phone

Todo: Add screenshot with small events page

### Continue

[Go to step 8](https://github.com/pip-webui/pip-webui-sample/blob/master/step8/) to show notifications.

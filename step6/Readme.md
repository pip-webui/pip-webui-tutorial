# Pip.WebUI Getting Started <br/> Step 6. Add IoT Nodes page with tiles view

[Go to step 5](https://github.com/pip-webui/pip-webui-sample/blob/master/step5/) to add settings and help to your application.

### Add special template and controller to display tiles in module of your application

In the **/src** create **IoT_nodes** folder and create the following tree file inside.

##### IoT_nodes_tiles.html

```html
<pip-tiles class="layout-fill pip-no-tabs" column-width="440">
    <div class="masonry-brick pip-tile w440-flex">
        <div class="p24-flex">
            <div class="pip-details-title">
                <p class="pip-title">This is a special node</p>
            </div>
            <div>
                Temperature: 28 deg
            </div>
            <div>
                Radiation level: 0.11 msv
            </div>
        </div>
    </div>

    <div class="masonry-brick pip-tile w440-flex " ng-repeat="node in nodes">
        <div class="p24-flex">
            <div class="pip-details-title">
                <p class="pip-title">{{ node.name }}</p>
            </div>
            <div>
                Temperature: {{ node.temperature }}
            </div>
            <div>
                Radiation level: {{ node.radiation_level }}
            </div>
            <pip-location pip-location-pos="location_point"
                          pip-location-name="location_point.name"
                          pip-location-resize="resizeTiles()">
            </pip-location>
        </div>
    </div>
</pip-tiles>
```

##### IoT_nodes.js

```javascript
(function (angular) {

    var thisModule = angular.module('IoTNodesModule', []);

    thisModule.controller('IoTNodesController', function($scope, pipAppBar) {

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
        
        $scope.resizeTiles = function() {
            $scope.$broadcast('pipResizeLayout');
        };
        
        pipAppBar.showTitleText('IoT Nodes'); // Show title of application or specific page
        pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
        pipAppBar.showLocalActions(); // Show actions of your application
        pipAppBar.showShadow();
    });

})(window.angular);
```

### Update your index.js

Connect **IoT nodes** module to main module of application

```javascript
var thisModule = angular.module('pipWebUISampleModule', [
    ...
    
    // Sample application modules
    'IoTNodesModule'
    
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
            .state('iot_nodes', { // <---- Pay attention!
                url: '/iot_nodes', // <---- Pay attention!
                controller: 'IoTNodesController', // <---- Pay attention!
                templateUrl: 'IoT_nodes/IoT_nodes_tiles.html', // <---- Pay attention!
                auth: true
            })
            .state('module_2', {
                url: '/module_2',
                controller: 'module2Controller',
                auth: true
            });

        // Configure default states
        pipAuthStateProvider.unauthorizedState('signin');
        pipAuthStateProvider.authorizedState('iot_nodes'); // <---- Pay attention!
        
        $urlRouterProvider.otherwise(function ($injector, $location) {
            return $location.$$path === '' ? '/signin' : '/iot_nodes'; // <---- Pay attention!
        });

        // Configure sidenav sections
        pipSideNavProvider.sections([
            {
                links: [
                    {title: 'IoT Nodes', url: '/iot_nodes'}, // <---- Pay attention!
                    {title: 'Module 2', url: '/module_2'}
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

After all changes instead of module_1 state you should get **IoT nodes**:

![IoT nodes](artifacts/tiles_view.png)

### Continue

[Go to step 7](https://github.com/pip-webui/pip-webui-sample/blob/master/step7/) to add Maintenance Events page with table view
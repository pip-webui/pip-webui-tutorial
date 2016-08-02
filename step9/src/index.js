(function (angular) {
    var thisModule = angular.module('pipWebUISampleModule', [
        // pip.WebUI modules
        'pipCore', 'pipRest', 'pipData', 'pipEntry', 'pipControls', 'pipLayout', 'pipNav',
        'pipLocations', 'pipPictures', 'pipDocuments', 'pipComposite', 'pipGuidance',
        'pipSettings', 'pipUserSettings', 'pipErrorHandling', 'pipSupport', 'pipHelp',
        
        // Application templates
        'SampleApplication.Templates',
        
        // Sample application modules
        'IoTNodesModule', 'maintenanceEventsModule'
    ]);
    
    thisModule.config(
        function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider, pipAuthStateProvider, 
                  pipSettingsProvider, pipHelpProvider, $urlRouterProvider) {
            // Configure icons of application
            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            // Configure application logo
            pipAppBarProvider.appTitleLogo('images/Logo.svg');

            // Configure global secondary actions
            pipAppBarProvider.globalSecondaryActions([
                {name: 'global.settings', title: 'Settings', state: 'settings'},
                {name: 'global.signout', title: 'Sign out', state: 'signout'}
            ]);

            // Configure states of application
            pipAuthStateProvider
                .state('iot_nodes', {
                    url: '/iot_nodes',
                    template: '<ui-view class="layout-row flex w-stretch"></ui-view>',
                    abstract: true,
                    auth: true
                })
                .state('iot_nodes.tiles', {
                    url: '/tiles',
                    controller: 'IoTNodesController',
                    templateUrl: 'IoT_nodes/IoT_nodes_tiles.html'
                })
                .state('iot_nodes.map', {
                    url: '/map',
                    controller: 'IoTNodesController',
                    templateUrl: 'IoT_nodes/IoT_nodes_map.html'
                })
                .state('maintenance_events', {
                    url: '/maintenance_events',
                    controller: 'maintenanceEventsController',
                    templateUrl: 'maintenance_events/maintenance_events.html',
                    auth: true
                });

            // Configure default states
            pipAuthStateProvider.unauthorizedState('signin');
            pipAuthStateProvider.authorizedState('iot_nodes.iot_nodes_tiles');
            
            $urlRouterProvider.otherwise(function ($injector, $location) {
                return $location.$$path === '' ? '/signin' : '/iot_nodes/tiles';
            });

            // Configure sidenav sections
            pipSideNavProvider.sections([
                {
                    links: [
                        {title: 'IoT Nodes', url: '/iot_nodes/tiles'},
                        {title: 'Maintenance Events', url: '/maintenance_events'}
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

            // Add a specific help tab
            pipHelpProvider.addTab({
                state: 'specific_help_tab',
                title: 'Specific help tab',
                auth: true,
                stateConfig: {
                    url: '/specific_help_tab',
                    templateUrl: 'help_tab.html'
                }
            });
    });
    
    thisModule.controller('pipWebUISampleController', function($scope, pipAppBar, pipToasts, $interval) {

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

        var i = 0,
            stopTime = $interval(addNextToast, 10000);

        function addNextToast() {
            if (i == $scope.events.length) {
                $interval.cancel(stopTime);
            } else {
                pipToasts.showNotification('Node ' + $scope.events[i].node_id + ': ' + $scope.events[i].description);
                i++;
            }
        }

    });
    
})(window.angular);

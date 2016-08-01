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
                    controller: 'IoTNodesController',
                    templateUrl: 'IoT_nodes/IoT_nodes.html',
                    auth: true
                })
                .state('maintenance_events', {
                    url: '/maintenance_events',
                    controller: 'maintenanceEventsController',
                    templateUrl: 'maintenance_events/maintenance_events.html',
                    auth: true
                });

            // Configure default states
            pipAuthStateProvider.unauthorizedState('signin');
            pipAuthStateProvider.authorizedState('iot_nodes');
            
            $urlRouterProvider.otherwise(function ($injector, $location) {
                return $location.$$path === '' ? '/signin' : '/iot_nodes';
            });

            // Configure sidenav sections
            pipSideNavProvider.sections([
                {
                    links: [
                        {title: 'IoT Nodes', url: '/iot_nodes'},
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
            pipHelpProvider.addPage({
                state: 'specific_help_tab',
                title: 'Specific help tab',
                auth: true,
                stateConfig: {
                    url: '/specific_help_tab',
                    templateUrl: 'help_tab.html'
                }
            });
    });
    
    thisModule.controller('pipWebUISampleController', function($scope, pipAppBar) {

    });

    thisModule.controller('module2Controller', function($scope, pipAppBar) {
        pipAppBar.showTitleText('Module 2'); // Show title of application or specific page
        pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
        pipAppBar.showLocalActions(); // Show actions of your application
    });
    
})(window.angular);

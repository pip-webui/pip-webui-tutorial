(function (angular) {
    var app = angular.module('app', [
        // pipWebUI modules
        'pipRest', 'pipErrorHandling', 'pipWebuiTests', 'pipLayout', 'pipNav', 'pipEntry',
        'pipSettings', 'pipUserSettings', 'pipSupport', 'pipHelp',

        // Application templates
        'app.Templates',

        // Sample application modules
        'nodesModule', 'eventsModule'
    ]);
    
    app.config(
        function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider, pipAuthStateProvider, 
                  pipSettingsProvider, pipHelpProvider, $urlRouterProvider, pipRestProvider) {
            // Configure icons of application
            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            // Configure global secondary actions
            pipAppBarProvider.globalSecondaryActions([
                {name: 'global.settings', title: 'Settings', state: 'settings'},
                {name: 'global.signout', title: 'Sign out', state: 'signout'}
            ]);

            // Configure server url
            pipRestProvider.serverUrl('http://fakeserver.net');

            // Configure states of application
            pipAuthStateProvider
                .state('nodes', { 
                    url: '/nodes', 
                    template: '<ui-view class="layout-row flex w-stretch"></ui-view>', 
                    abstract: true,
                    controller: 'nodesController', 
                    auth: true 
                })
                .state('nodes.tiles', {
                    url: '/tiles', 
                    controller: 'nodesTilesController', 
                    templateUrl: 'nodes/nodes_tiles.html' 
                })
                .state('nodes.map', {
                    url: '/map', 
                    controller: 'nodesMapController', 
                    templateUrl: 'nodes/nodes_map.html' 
                })
                .state('events', { 
                    url: '/events', 
                    controller: 'eventsController',
                    templateUrl: 'events/events.html', 
                    auth: true
                });

            // Configure default states
            pipAuthStateProvider.unauthorizedState('signin');
            pipAuthStateProvider.authorizedState('nodes.tiles');

            $urlRouterProvider.otherwise(function ($injector, $location) {
                return $location.$$path === '' ? '/signin' : '/nodes/tiles';
            });

            pipAppBarProvider.appTitleText('Sample Application');

            // Configure sidenav sections
            pipSideNavProvider.sections([
                {
                    links: [
                        {title: 'Nodes', url: '/nodes/tiles'},
                        {title: 'Events', url: '/events'}
                    ]
                },
                {
                    links: [
                        {title: 'Settings', url: '/settings'},
                        {title: 'Help', url: '/help'},
                        {title: 'Feedback', url: '/feedback'}
                    ]
                },
                {
                    links: [
                        {title: 'Sign Out', url: '/signout'}
                    ]
                }
            ]);

            // Register custom help page
            pipHelpProvider.addTab({
                state: 'help',
                title: 'Help page',
                stateConfig: {
                    controller: function() {

                    },
                    url: '/help',
                    auth: false,
                    templateUrl: 'help/help.html'
                }
            });
    });

    app.controller('appController', function($scope, pipAppBar, pipTestDataService, pipWebuiTest) {
        // run fake server
        pipWebuiTest.runFakeServer('http://fakeserver.net');        
        // Show application title
        pipAppBar.showAppTitleText('Sample Application');
        // Show icon to open sidenav
        pipAppBar.showMenuNavIcon();
        // Show button with tree dots for secondary actions
        pipAppBar.showLocalActions();
        // Create test data using pipWebUI services
        $scope.dataSet = pipTestDataService.createTestDataset();
    });
    
})(window.angular);

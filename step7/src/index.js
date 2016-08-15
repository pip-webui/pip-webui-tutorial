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
                  pipSettingsProvider, pipHelpProvider, $urlRouterProvider) {
            // Configure icons of application
            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            // Configure global secondary actions
            pipAppBarProvider.globalSecondaryActions([
                {name: 'global.settings', title: 'Settings', state: 'settings'},
                {name: 'global.signout', title: 'Sign out', state: 'signout'}
            ]);

            // Configure states of application
            pipAuthStateProvider
                .state('nodes', {
                    url: '/nodes',
                    controller: 'nodesController',
                    templateUrl: 'nodes/nodes.html',
                    auth: true
                })
                .state('events', { 
                    url: '/events', 
                    controller: 'eventsController',
                    templateUrl: 'events/events.html', 
                    auth: true
                });

            // Configure default states
            pipAuthStateProvider.unauthorizedState('signin');
            pipAuthStateProvider.authorizedState('nodes');

            $urlRouterProvider.otherwise(function ($injector, $location) {
                return $location.$$path === '' ? '/signin' : '/nodes';
            });

            pipAppBarProvider.appTitleText('Sample Application');

            // Configure sidenav sections
            pipSideNavProvider.sections([
                {
                    links: [
                        {title: 'Nodes', url: '/nodes'},
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
                    controller: function($timeout) {
                        $timeout(function() {
                            $('pre code').each(function(i, block) {
                                Prism.highlightElement(block);
                            });
                        });
                    },
                    url: '/help',
                    auth: false,
                    templateUrl: 'help/help.html'
                }
            });
                        
    });

    app.controller('appController', function($scope, pipAppBar) {
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

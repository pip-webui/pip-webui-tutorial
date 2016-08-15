(function () {
    var app = angular.module('app', [
            // pipWebUI modules
            'pipRest', 'pipLayout', 'pipErrorHandling', 'pipWebuiTests', 'pipNav', 'pipEntry',
            'pipSettings', 'pipUserSettings', 'pipSupport', 'pipHelp',
            
            // Application templates
            'app.Templates',
            // Sample application modules
            'nodesModule', 'eventsModule'            
    ]);

app.config(
    function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider, pipAuthStateProvider, 
                  pipSettingsProvider, pipHelpProvider, $urlRouterProvider, pipRestProvider) {

        // Load default iconset
        $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

        // Define global secondary actions (for actions popup menu) 
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

        // Set default application title
        pipAppBarProvider.appTitleText('Sample Application');     

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

        // Configure default states
        pipAuthStateProvider.unauthorizedState('signin');
        pipAuthStateProvider.authorizedState('nodes');
        
        $urlRouterProvider.otherwise(function ($injector, $location) {
            return $location.$$path === '' ? '/signin' : '/nodes';
        });

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

    app.controller('appController', function($scope, pipAppBar, pipWebuiTest, pipTestDataService) {
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

})();
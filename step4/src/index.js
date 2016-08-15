(function () {
    var app = angular.module('app', [
            // pipWebUI modules
            'pipRest', 'pipLayout', 'pipErrorHandling', 'pipWebuiTests', 'pipNav',  'pipEntry',

            // Application templates
            'app.Templates'
    ]);

    app.config(function(pipAuthStateProvider, $mdIconProvider, pipAppBarProvider, pipSideNavProvider, $urlRouterProvider) {
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
                template: '<h1>Nodes Page</h1>',
                auth: true
            })
            .state('events', {
                url: '/events',
                controller: 'eventsController',
                template: '<h1>Events Page</h1>',
                auth: true
            });

        // Set default application title
        pipAppBarProvider.appTitleText('Sample Application');     

        pipSideNavProvider.sections([
            {
                links: [
                    {title: 'nodes', url: '/nodes'},
                    {title: 'events', url: '/events'}
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

    app.controller('nodesController', function($scope, pipAppBar) {
        // Show page title
        pipAppBar.showTitleText('Nodes');
        // Show menu icon to open sidenav
        pipAppBar.showMenuNavIcon();
        // Show local actions in secondary actions popup
        pipAppBar.showLocalActions();
    });

    app.controller('eventsController', function($scope, pipAppBar) {
        // Show page title
        pipAppBar.showTitleText('Events');
        // Show menu icon to open sidenav
        pipAppBar.showMenuNavIcon();
        // Show local actions in secondary actions popup
        pipAppBar.showLocalActions();
    });

})();
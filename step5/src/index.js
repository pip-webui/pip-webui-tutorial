(function (angular) {
    var app = angular.module('app', [
        // pipWebUI modules
        'pipRest', 'pipErrorHandling', 'pipWebuiTests', 'pipLayout', 'pipNav', 'pipEntry',
        'pipSettings', 'pipUserSettings', 'pipSupport', 'pipHelp',

        // Application templates
        'app.Templates'
    ]);

    app.config(function ($mdIconProvider, pipAuthStateProvider, $urlRouterProvider, pipSideNavProvider, pipAppBarProvider) {
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
                template: '<h1>Nodes Page</h1>',
                auth: true
            })
            .state('events', {
                url: '/events',
                controller: 'eventsController',
                template: '<h1>Events Page</h1>',
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
    });

    app.controller('appController', function($scope, pipAppBar, pipTestDataService) {
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

})(window.angular);

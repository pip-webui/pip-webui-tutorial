(function (angular) {
    var app = angular.module('app', [
        // pipWebUI modules
        'pipRest', 'pipLayout', 'pipErrorHandling', 'pipWebuiTests',

        // Application templates
        'app.Templates'
    ]);

    app.config(function(pipAuthStateProvider) {
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
    });

    app.controller('appController', function($scope, pipTestDataService) {
        // Create test data using pipWebUI services
        $scope.dataSet = pipTestDataService.createTestDataset();
    });

    app.controller('nodesController', function($scope) {
        // Todo: Add controller logic for IoT Nodes page
    });

    app.controller('eventsController', function($scope) {
        // Todo: Add controller logic for IoT Events page
    });
    
})(window.angular);

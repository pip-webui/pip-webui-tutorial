(function (angular) {
    var app = angular.module('app', [
        // pipWebUI modules
        'pipRest', 'pipLayout', 'pipErrorHandling',

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

    app.controller('appController', function($scope) {
        // Todo: Add controller logic for application
    });

    app.controller('nodesController', function($scope) {
        // Todo: Add controller logic for IoT Nodes page
    });

    app.controller('eventsController', function($scope) {
        // Todo: Add controller logic for IoT Events page
    });
    
})(window.angular);

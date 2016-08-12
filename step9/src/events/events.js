(function (angular) {

    var thisModule = angular.module('eventsModule', []);

    thisModule.controller('eventsController', function($scope, $interval, $mdMedia, $http, pipAppBar, pipToasts) {

        var req,
            stopTime,
            EVENTS_MAX = 200, // The maximum number of events that can be generated
            events;

        // Show page title
        pipAppBar.showTitleText('Events');
        // Show menu icon to open sidenav
        pipAppBar.showMenuNavIcon();
        // Show local page actions
        pipAppBar.showLocalActions();
        // Add shadow under the appbar
        pipAppBar.hideShadow();

        // Initialize service for changing layouts when the screen size changed
        $scope.$mdMedia = $mdMedia;
        
        // Get test data 
        events = $scope.dataSet.get('EventsTestCollection');

        // $scope.events = $scope.dataSet.get('EventsTestCollection').getAll();

        // Prepare request 
        req = {method: 'GET', url: 'http://fakeserver.net' + '/api/events'};
        // Get data from the server
        $http(req)
        .success(function (result) {
            $scope.events = result;

            stopTime = $interval(addNextToast, 10000); // use angular $interval for imitation receiving messages every 10 sec.            
        })
        .error(function (error) {
            console.log('Error: get events error! ', error); 
        });    

        $scope.iconColors = {
            'warn-circle': '#EF5350',
            'info-circle-outline': '#8BC34A',
            'warn-triangle': '#FFD54F'
        };

        return;

        function addNextToast() {
            var event,
                i = $scope.events.length;

            if (i > EVENTS_MAX) {
                $interval.cancel(stopTime);
            } else {
                // generate event
                event = events.create();

                // get event from server 
                // Prepare request 
                req = {method: 'GET', url: 'http://fakeserver.net' + '/api/events/' + event.id};
                // Get data from the server
                $http(req)
                .success(function (result) {
                    $scope.events.push(result);
                })
                .error(function (error) {
                    console.log('Error: get events error! ', error); 
                }); 

                // Function to display notification
                pipToasts.showNotification('Node ' + event.node_name + ' (' + event.node_id + '): ' + event.description);
                i++;
            }
        }
    });

})(window.angular);

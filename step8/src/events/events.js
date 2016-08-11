(function (angular) {

    var thisModule = angular.module('eventsModule', []);

    thisModule.controller('eventsController', function($scope, pipAppBar, $interval, pipToasts, $mdMedia) {

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
        $scope.events = $scope.dataSet.get('EventsTestCollection').getAll();

        $scope.iconColors = {
            'warn-circle': '#EF5350',
            'info-circle-outline': '#8BC34A',
            'warn-triangle': '#FFD54F'
        };

        var i = 0;
        var stopTime = $interval(addNextToast, 10000); // use angular $interval for imitation receiving messages every 10 sec.

        function addNextToast() {
            if (i == $scope.events.length) {
                $interval.cancel(stopTime);
            } else {
                // Function to display notification
                pipToasts.showNotification('Node ' + $scope.events[i].node_id + ': ' + $scope.events[i].description);
                i++;
            }
        }
    });

})(window.angular);

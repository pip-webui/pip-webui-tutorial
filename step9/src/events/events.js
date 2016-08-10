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

        $scope.events = [
            {node_id: '1', description: 'Thermal shock', temperature: '42 deg', rad_level: '0.77 msv', icon: 'warn-circle'},
            {node_id: '15', description: 'Temperature change', temperature: '16 deg', rad_level: '1.35 msv', icon: 'info-circle-outline'},
            {node_id: '4', description: 'Radiation level increase', temperature: '22 deg', rad_level: '5.55 msv', icon: 'warn-triangle'},
            {node_id: '3', description: 'Temperature dropped significantly', temperature: '-18 deg', rad_level: '0.11 msv', icon: 'warn-triangle'},
            {node_id: '6', description: 'Eruption', temperature: '42 deg', rad_level: '0.22 msv', icon: 'warn-circle'},
            {node_id: '7', description: 'Thermal shock', temperature: '42 deg', rad_level: '0.77 msv', icon: 'warn-circle'},
            {node_id: '18', description: 'Temperature change', temperature: '16 deg', rad_level: '1.35 msv', icon: 'info-circle-outline'},
            {node_id: '2', description: 'Radiation level increase', temperature: '22 deg', rad_level: '5.55 msv', icon: 'warn-triangle'},
            {node_id: '22', description: 'Temperature dropped significantly', temperature: '-18 deg', rad_level: '0.11 msv', icon: 'warn-triangle'},
            {node_id: '9', description: 'Eruption', temperature: '42 deg', rad_level: '0.22 msv', icon: 'warn-circle'}
        ];

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

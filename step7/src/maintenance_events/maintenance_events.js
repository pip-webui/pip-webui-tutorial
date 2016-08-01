(function (angular) {

    var thisModule = angular.module('maintenanceEventsModule', []);

    thisModule.controller('maintenanceEventsController', function($scope, pipAppBar) {

        $scope.events = [
            {node_id: '1', description: 'Thermal shock', temperature: '42 deg', rad_level: '0.77 msv', type: 'danger'},
            {node_id: '15', description: 'Temperature change', temperature: '16 deg', rad_level: '1.35 msv', type: 'info'},
            {node_id: '4', description: 'Radiation level increase', temperature: '22 deg', rad_level: '5.55 msv', type: 'warning'},
            {node_id: '3', description: 'Temperature dropped significantly', temperature: '-18 deg', rad_level: '0.11 msv', type: 'warning'},
            {node_id: '6', description: 'Eruption', temperature: '42 deg', rad_level: '0.22 msv', type: 'danger'},
            {node_id: '7', description: 'Thermal shock', temperature: '42 deg', rad_level: '0.77 msv', type: 'danger'},
            {node_id: '18', description: 'Temperature change', temperature: '16 deg', rad_level: '1.35 msv', type: 'info'},
            {node_id: '2', description: 'Radiation level increase', temperature: '22 deg', rad_level: '5.55 msv', type: 'warning'},
            {node_id: '22', description: 'Temperature dropped significantly', temperature: '-18 deg', rad_level: '0.11 msv', type: 'warning'},
            {node_id: '9', description: 'Eruption', temperature: '42 deg', rad_level: '0.22 msv', type: 'danger'}
        ];

        pipAppBar.showTitleText('Maintenance Events'); // Show title of application or specific page
        pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
        pipAppBar.showLocalActions(); // Show actions of your application
        pipAppBar.hideShadow();
    });

})(window.angular);

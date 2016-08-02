(function (angular) {

    var thisModule = angular.module('IoTNodesModule', []);

    thisModule.controller('IoTNodesController', function($scope, pipAppBar, $state) {

        $scope.nodes = [
            {name: 'Node 1', temperature: '20 deg', radiation_level: '1.28 msv'},
            {name: 'Node 2', temperature: '25 deg', radiation_level: '5.00 msv'},
            {name: 'Node 3', temperature: '18 deg', radiation_level: '11.01 msv'},
            {name: 'Node 4', temperature: '21 deg', radiation_level: '0.78 msv'},
            {name: 'Node 5', temperature: '14 deg', radiation_level: '0.98 msv'},
            {name: 'Node 6', temperature: '16 deg', radiation_level: '19.45 msv'},
            {name: 'Node 7', temperature: '18 deg', radiation_level: '3.24 msv'},
            {name: 'Node 8', temperature: '19 deg', radiation_level: '1.56 msv'},
            {name: 'Node 9', temperature: '26 deg', radiation_level: '0.98 msv'},
            {name: 'Node 10', temperature: '23 deg', radiation_level: '4.57 msv'}
        ];

        $scope.location_point = {
            type: 'Point',
            coordinates: [32.393603, -110.982593],
            name: 'Tucson'
        };

        pipAppBar.showTitleText('IoT Nodes'); // Show title of application or specific page
        pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
        pipAppBar.showShadow();

        pipAppBar.showLocalActions([ // Show actions of your application
            {
                name: isTiles() ? 'iot_nodes.map': 'iot_nodes.tiles',
                icon: isTiles() ? 'icons:location': 'icons:grid',
                callback: onChangeView
            }
        ]);

        function isTiles() {
            return $state.current.name === 'iot_nodes.tiles';
        }

        function onChangeView() {
            $state.go(isTiles() ? 'iot_nodes.map': 'iot_nodes.tiles');
        }
    });

})(window.angular);

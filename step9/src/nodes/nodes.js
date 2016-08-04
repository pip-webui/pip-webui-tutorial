(function (angular) {

    var thisModule = angular.module('nodesModule', []);

    thisModule.controller('nodesController', function($scope, pipAppBar, $state) {
        // Show page title
        pipAppBar.showTitleText('Nodes');
        // Show menu icon to open sidenav
        pipAppBar.showMenuNavIcon();
        // Show primary action to switch between views
        pipAppBar.showLocalActions([
            {
                name: isTilesView() ? 'nodes.map': 'nodes.tiles',
                icon: isTilesView() ? 'icons:location': 'icons:grid',
                callback: toggleView
            }
        ]);
        // Add shadow under the appbar
        pipAppBar.showShadow();

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
            coordinates: [32.393603, -110.982593]
        };

        $scope.location_points = [
            {
                type: 'Point',
                coordinates: [32.413603, -110.982593]
            }, {
                type: 'Point',
                coordinates: [55.393603, -120.982593]
            }, {
                type: 'Point',
                coordinates: [8.155443, 77.625688]
            }, {
                type: 'Point',
                coordinates: [56.286074, 119.312690]
            }, {
                type: 'Point',
                coordinates: [33.520236, 135.684374]
            }, {
                type: 'Point',
                coordinates: [64.720681, -14.321345]
            }
        ];

        function isTilesView() {
            return $state.current.name === 'nodes.tiles';
        }

        function toggleView() {
            $state.go(isTilesView() ? 'nodes.map': 'nodes.tiles');
        }
    });

    thisModule.controller('nodesTilesController', function($scope) {
        // Keep it empty
    });

    thisModule.controller('nodesMapController', function($scope) {
        // Keep it empty
    });

})(window.angular);

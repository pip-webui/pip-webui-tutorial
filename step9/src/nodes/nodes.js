(function (angular) {

    var thisModule = angular.module('nodesModule', []);

    thisModule.controller('nodesController', function($scope, pipAppBar, $state) {
        // Show page title
        pipAppBar.showTitleText('Nodes');
        // Show menu icon to open sidenav
        pipAppBar.showMenuNavIcon();
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

        $scope.iconPath = 'M0,15a15,15 0 1,0 30,0a15,15 0 1,0 -30,0';

        $scope.location_points = [{
            type: 'Point',
            coordinates: [32.413603, -110.982593],
            fill: '#FFD54F'
        }, {
            type: 'Point',
            coordinates: [55.393603, -120.982593]
        }, {
            type: 'Point',
            coordinates: [8.155443, 77.625688],
            fill: '#FFD54F'
        }, {
            type: 'Point',
            coordinates: [56.286074, 119.312690],
            fill: '#8BC34A'
        }, {
            type: 'Point',
            coordinates: [33.520236, 135.684374]
        }, {
            type: 'Point',
            coordinates: [64.720681, -14.321345],
            fill: '#FFD54F'
        }, {
            type: 'Point',
            coordinates: [-34.673479, 19.983090]
        }, {
            type: 'Point',
            coordinates: [-25.368410, 45.377503],
            fill: '#FFD54F'
        }, {
            type: 'Point',
            coordinates: [12.480935, 53.872444],
            fill: '#8BC34A'
        }, {
            type: 'Point',
            coordinates: [-42.595210, -63.641692]
        }];
    });

    thisModule.controller('nodesTilesController', function(pipAppBar, $state) {
        // Show primary action to switch between views
        pipAppBar.showLocalActions([
            {
                name: 'nodes.map',
                icon: 'icons:location',
                callback: toMapView
            }
        ]);

        function toMapView() {
            $state.go('nodes.map');
        }
    });

    thisModule.controller('nodesMapController', function($scope, pipAppBar, $state) {
        setTimeout(function() {
            //$scope.openMap = true;
        })

        // Show primary action to switch between views
        pipAppBar.showLocalActions([
            {
                name: 'nodes.tiles',
                icon: 'icons:grid',
                callback: toTilesView
            }
        ]);

        function toTilesView() {
            $state.go('nodes.tiles');
        }
    });

})(window.angular);

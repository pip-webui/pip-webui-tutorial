(function (angular) {

    var thisModule = angular.module('nodesModule', []);

    thisModule.controller('nodesController', function($scope, $state, $http, pipAppBar) {
        
        var req;

        // Show page title
        pipAppBar.showTitleText('Nodes');
        // Show menu icon to open sidenav
        pipAppBar.showMenuNavIcon();
        // Add shadow under the appbar
        pipAppBar.showShadow();

        // Get test data
        req = {method: 'GET', url: 'http://fakeserver.net' + '/api/nodes'};

        $http(req)
        .success(function (result) {
            $scope.nodes = result;

            $scope.iconPath = 'M0,15a15,15 0 1,0 30,0a15,15 0 1,0 -30,0';

            $scope.location_points = getLocations();            
        })
        .error(function (error) {
            console.log('Error: get nodes error! ', error); 
        }); 

        return; 

        function getLocations() {
            var points = [];

            $scope.nodes.forEach(function (node) {
                points.push(node.location_points);
            });

            return points;
        }
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

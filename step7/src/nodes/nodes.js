(function (angular) {

    var thisModule = angular.module('nodesModule', []);

    thisModule.controller('nodesController', function($scope, pipAppBar) {
        // Show page title
        pipAppBar.showTitleText('Nodes');
        // Show menu icon to open sidenav
        pipAppBar.showMenuNavIcon();
        // Show local page actions
        pipAppBar.showLocalActions();
        // Add shadow under the appbar
        pipAppBar.showShadow();
        // Get test data
        $scope.nodes = $scope.dataSet.get('NodesTestCollection').getAll();
        
        $scope.iconPath = 'M0,15a15,15 0 1,0 30,0a15,15 0 1,0 -30,0';
        
        $scope.location_points = getLocations();
        
        function getLocations() {
            var points = [];
        
            $scope.nodes.forEach(function (node) {
                points.push(node.location_points);
            });
        
            return points;
        }
    });

})(window.angular);
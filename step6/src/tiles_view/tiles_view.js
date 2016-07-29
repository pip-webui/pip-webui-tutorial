(function (angular) {

    var thisModule = angular.module('tilesViewModule', []);

    thisModule.controller('tilesViewController', function($scope, pipAppBar) {

        $scope.nodes = [
            {name: 'Node 1', temperature: '20 deg'},
            {name: 'Node 2', temperature: '25 deg'},
            {name: 'Node 3', temperature: '18 deg'},
            {name: 'Node 4', temperature: '21 deg'},
            {name: 'Node 5', temperature: '14 deg'},
            {name: 'Node 6', temperature: '16 deg'},
            {name: 'Node 7', temperature: '18 deg'},
            {name: 'Node 8', temperature: '19 deg'},
            {name: 'Node 9', temperature: '26 deg'},
            {name: 'Node 10', temperature: '23 deg'}
        ];

        pipAppBar.showTitleText('Tiles View'); // Show title of application or specific page
        pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
        pipAppBar.showLocalActions(); // Show actions of your application
        pipAppBar.showShadow();
    });

})(window.angular);

(function (angular) {

    var thisModule = angular.module('maintenanceEventsModule', []);

    thisModule.controller('maintenanceEventsController', function($scope, pipAppBar) {

        pipAppBar.showTitleText('Maintenance Events'); // Show title of application or specific page
        pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
        pipAppBar.showLocalActions(); // Show actions of your application
        pipAppBar.hideShadow();
    });

})(window.angular);

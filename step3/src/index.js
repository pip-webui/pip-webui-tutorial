(function (angular) {
    var thisModule = angular.module('pipWebUISampleModule', [
        // pipWebUI modules
        'pipCore', 'pipRest', 'pipData', 'pipEntry', 'pipControls', 'pipLayout', 'pipNav',
        'pipLocations', 'pipPictures', 'pipDocuments', 'pipComposite', 'pipGuidance',
        'pipSettings', 'pipUserSettings', 'pipErrorHandling', 'pipSupport', 'pipHelp',

        // Application templates
        'SampleApplication.Templates'
    ]);
    
    thisModule.config(function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider) {
        // Configure icons of application
        $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

        // Configure application logo
        pipAppBarProvider.appTitleLogo('images/Logo.svg');

        // Configure global secondary actions
        pipAppBarProvider.globalSecondaryActions([
            {name: 'global.settings', title: 'Settings', state: 'settings'},
            {name: 'global.signout', title: 'Sign out', state: 'signout'}
        ]);

        // Configure sidenav sections
        pipSideNavProvider.sections([
            {
                links: [
                    {title: 'Module 1', url: '/module_1'},
                    {title: 'Module 2', url: '/module_2'}
                ]
            }
        ]);
    });
    
    thisModule.controller('pipWebUISampleController', function($scope, pipAppBar) {
        pipAppBar.showTitleText('Sample Application'); // Show title of application or specific page
        pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
        pipAppBar.showLocalActions(); // Show actions of your application
    });
    
})(window.angular);

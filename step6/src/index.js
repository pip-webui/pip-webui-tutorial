(function (angular) {
    var thisModule = angular.module('pipWebUISampleModule', [
        // pip.WebUI modules
        'pipCore', 'pipRest', 'pipData', 'pipEntry', 'pipControls', 'pipLayout', 'pipNav',
        'pipLocations', 'pipPictures', 'pipDocuments', 'pipComposite', 'pipGuidance',
        'pipSettings', 'pipUserSettings', 'pipErrorHandling', 'pipSupport', 'pipHelp',
        
        // Application templates
        'SampleApplication.Templates',
        
        // Sample application modules
        'tilesViewModule'
    ]);
    
    thisModule.config(
        function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider, pipAuthStateProvider, 
                  pipSettingsProvider, pipHelpProvider, $urlRouterProvider) {
            // Configure icons of application
            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            // Configure application logo
            pipAppBarProvider.appTitleLogo('images/Logo.svg');

            // Configure global secondary actions
            pipAppBarProvider.globalSecondaryActions([
                {name: 'global.settings', title: 'Settings', state: 'settings'},
                {name: 'global.signout', title: 'Sign out', state: 'signout'}
            ]);

            // Configure states of application
            pipAuthStateProvider
                .state('tiles_view', {
                    url: '/tiles_view',
                    controller: 'tilesViewController',
                    templateUrl: 'tiles_view/tiles_view.html',
                    auth: true
                })
                .state('module_2', {
                    url: '/module_2',
                    controller: 'module2Controller',
                    auth: true
                });

            // Configure default states
            pipAuthStateProvider.unauthorizedState('signin');
            pipAuthStateProvider.authorizedState('tiles_view');
            
            $urlRouterProvider.otherwise(function ($injector, $location) {
                return $location.$$path === '' ? '/signin' : '/tiles_view';
            });

            // Configure sidenav sections
            pipSideNavProvider.sections([
                {
                    links: [
                        {title: 'Tiles View', url: '/tiles_view'},
                        {title: 'Module 2', url: '/module_2'}
                    ]
                },
                {
                    links: [
                        {title: 'Help', url: '/help'},
                        {title: 'Settings', url: '/settings'},
                        {title: 'Sign Out', url: '/signout'}
                    ]
                }
            ]);

            // Add a specific settings tab
            pipSettingsProvider.addPage({
                state: 'specific_settings_tab',
                title: 'Specific settings tab',
                auth: true,
                stateConfig: {
                    url: '/specific_settings_tab',
                    templateUrl: 'settings_tab.html'
                }
            });

            // Add a specific help tab
            pipHelpProvider.addPage({
                state: 'specific_help_tab',
                title: 'Specific help tab',
                auth: true,
                stateConfig: {
                    url: '/specific_help_tab',
                    templateUrl: 'help_tab.html'
                }
            });
    });
    
    thisModule.controller('pipWebUISampleController', function($scope, pipAppBar) {

    });

    thisModule.controller('module2Controller', function($scope, pipAppBar) {
        pipAppBar.showTitleText('Module 2'); // Show title of application or specific page
        pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
        pipAppBar.showLocalActions(); // Show actions of your application
    });
    
})(window.angular);

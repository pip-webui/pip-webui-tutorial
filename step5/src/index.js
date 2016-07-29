(function (angular) {
    var thisModule = angular.module('pipWebUISampleModule', [
        // pipWebUI modules
        'pipCore', 'pipRest', 'pipData', 'pipEntry', 'pipControls', 'pipLayout', 'pipNav',
        'pipLocations', 'pipPictures', 'pipDocuments', 'pipComposite', 'pipGuidance',
        'pipSettings', 'pipUserSettings', 'pipErrorHandling', 'pipSupport', 'pipHelp'
    ]);
    
    thisModule.config(
        function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider, pipAuthStateProvider, pipSettingsProvider, pipHelpProvider) {
            // Configure icons of application
            $mdIconProvider.iconSet('icons', '../lib/images/icons.svg', 512);

            // Configure application logo
            pipAppBarProvider.appTitleLogo('../lib/images/Logo.svg');

            // Configure global secondary actions
            pipAppBarProvider.globalSecondaryActions([
                {name: 'global.settings', title: 'Settings', state: 'settings'},
                {name: 'global.signout', title: 'Sign out', state: 'signout'}
            ]);

            // Configure states of application
            pipAuthStateProvider
                .state('module_1', {
                    url: '/module_1',
                    controller: 'module1Controller',
                    auth: true
                })
                .state('module_2', {
                    url: '/module_2',
                    controller: 'module2Controller',
                    auth: true
                });

            // Configure default states
            pipAuthStateProvider.unauthorizedState('signin');
            pipAuthStateProvider.authorizedState('module_1');

            // Configure sidenav sections
            pipSideNavProvider.sections([
                {
                    links: [
                        {title: 'Module 1', url: '/module_1'},
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

    thisModule.controller('module1Controller', function($scope, pipAppBar) {
        pipAppBar.showTitleText('Module 1'); // Show title of application or specific page
        pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
        pipAppBar.showLocalActions(); // Show actions of your application
    });

    thisModule.controller('module2Controller', function($scope, pipAppBar) {
        pipAppBar.showTitleText('Module 2'); // Show title of application or specific page
        pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
        pipAppBar.showLocalActions(); // Show actions of your application
    });
    
})(window.angular);

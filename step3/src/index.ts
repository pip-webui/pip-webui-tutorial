'use strict';

function configureApp(
    $mdIconProvider: ng.material.IIconProvider, 
    pipSideNavProvider: pip.nav.ISideNavProvider, 
    pipNavMenuProvider: pip.nav.INavMenuProvider, 
    pipNavHeaderProvider: pip.nav.INavHeaderProvider,
    pipAppBarProvider: pip.nav.IAppBarProvider, 
    pipNavIconProvider: pip.nav.INavIconProvider,
    pipActionsProvider: pip.nav.IActionsProvider, 
    pipBreadcrumbProvider: pip.nav.IBreadcrumbProvider, 
 ) {
    $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);
    pipSideNavProvider.type = 'popup';

    pipNavHeaderProvider.title = "Sample application";
    pipNavHeaderProvider.subtitle = "Learn how to use pip-webui";

    pipNavMenuProvider.sections = [
        {
            name: 'main',
            links: [
                { name: 'nodes', icon: 'icons:grid', title: 'Nodes', state: 'nodes' },
                { name: 'events', icon: 'icons:progress', title: 'Events', state: 'events' },
                { name: 'settings', icon: 'icons:config', title: 'Settings', state: 'settings.sample' }
            ]
        },
        {
            name: 'signout',
            links: [
                { name: 'signout', icon: 'icons:exit', title: 'Sign out', event: 'appSignout' }
            ]
        }
    ];

    // Configure appbar    
    pipBreadcrumbProvider.text = "Sample Application";
    pipNavIconProvider.setMenu();
    pipActionsProvider.primaryGlobalActions = [
            { name: 'global.notifications', icon: 'icons:bell', count: 0, event: 'appNotificationsClicked', subActions: []  }
    ];

    pipActionsProvider.secondaryGlobalActions = [
        { name: 'global.settings', title: 'Settings', state: 'settings.sample', subActions: [] },
        { name: 'global.signout', title: 'Sign out', event: 'appSignout', subActions: [] }
    ];
}

class AppController {
    public greeting: string = "";

    public saySomething(): void {
        this.greeting = "Hello world!";
    }
};

angular
    .module('app', [
        'ngMaterial',
        'pipLayout', 
        'pipNav', 
        'pipControls',
        'pipBehaviors',
        'pipServices', 
        'pipTheme',
        'pipSettings',
        'pipButtons',
        'pipLocations'
    ])
    .config(configureApp)
    .controller('appController', AppController);
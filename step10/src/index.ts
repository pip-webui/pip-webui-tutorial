'use strict';

import './nodes/nodes.ts';
import './events/events.ts';
import './settings/settings_sample';
import './notifications/notifications';

import { INotificationService } from './notifications/notifications';

function configureApp(
    $mdIconProvider: ng.material.IIconProvider, 
    $urlRouterProvider,
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
                { name: 'nodes', icon: 'icons:grid', title: 'Nodes', state: 'nodes.tiles' },
                { name: 'events', icon: 'icons:progress', title: 'Events', state: 'events.list' },
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

    $urlRouterProvider.otherwise("/nodes/tiles");
}

class AppController {
    public constructor(
        notificationService: INotificationService
    ) {
        "ngInject";

        notificationService.start();
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
        'pipLocations',
        'pipCharts',

        'app.Templates',
        'app.Events',
        'app.Nodes',
        'app.Settings.Sample',
        'app.Notifications'
    ])
    .config(configureApp)
    .controller('appController', AppController);

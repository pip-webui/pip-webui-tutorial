# Getting Started With Pip.WebUI <br/> Step 4. Add pages and navigation

[Go to step 3](https://github.com/pip-webui/pip-webui-tutorial/blob/master/step3/) to add pip-webui components.

### Add the notes page

Add a **nodes.html** file into the **/src/nodes** folder:

```html
<h1>Welcome to Nodes page!</h1>
```
Then add a **nodes.ts** file into **/src/nodes** with controller and route configuration:

```javascript
'use strict';

function configureNodeRoutes(
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";

    // Configure module routes
    $stateProvider.state('nodes', {
        url: '/nodes',
        controller: NodesController,
        controllerAs: 'vm',
        templateUrl: 'nodes/nodes.html'
    });
}

class NodesController {
    public constructor(
        pipNavService: pip.nav.INavService
    ) {
        pipNavService.appbar.show();
        pipNavService.sidenav.show();
        pipNavService.breadcrumb.text = "Nodes";
    }
}

angular
    .module('app.Nodes', [ ])
    .config(configureNodeRoutes);
```

### Add the events page 

Similar to nodes, add some files for the events page.

Add a **events.html** file into the **/src/events** folder:

```html
<h1>Welcome to Events page!</h1>
```

And add a **events.ts** file into the **/src/events** folder:

```javascript
'use strict';

function configureEventRoutes(
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";

    // Configure module routes
    $stateProvider.state('events', {
        url: '/events',
        controller: EventsController,
        controllerAs: 'vm',
        templateUrl: 'events/events.html'
    });
}

class EventsController {
    public constructor(
        pipNavService: pip.nav.INavService
    ) {
        pipNavService.appbar.show();
        pipNavService.sidenav.show();
        pipNavService.breadcrumb.text = "Events";
    }
}

angular
    .module('app.Events', [ ])
    .config(configureEventRoutes);
```

### Include compiled HTML templates

Open **build.conf.js** and add a reference to the **./temp/pip-webui-tutorial-html.js** file that contains html pages compiled into javascript templates.
In the future versions of **pip-webui-tasks**, this step can be removed and done automatically.

```javascript
    browserify: {
        entries: [ 
            './temp/pip-webui-tutorial-html.js',
            './src/index.ts'
        ]
    }
```

### Add references to page modules into index.ts

Open the **index.ts** file and import files containing code for nodes and events pages:

```javascript
'use strict'

// >>>> Changes start here >>>>
import './nodes/nodes.ts';
import './events/events.ts';
// >>>> Changes end here >>>>
```

Add references to page modules into the main module:

```javascript
angular
    .module('app', [
        'ngMaterial',
        'pipLayout', 
        'pipNav', 
        'pipAppBar',        
        'pipControls',
        'pipBehaviors',
        'pipServices', 
        'pipTheme',
        'pipSettings',
        'pipButtons',
        'pipLocations',
// >>>> Changes start here >>>>
        'app.Templates',
        'app.Events',
        'app.Nodes'
// >>>> Changes end here >>>>
    ])
    .config(configureApp)
    .controller('appController', AppController);
```

Configure the default route in the app config:

```javascript
function configureApp(
    $mdIconProvider: ng.material.IIconProvider, 
// >>>> Changes start here >>>>
    $urlRouterProvider: any,
// >>>> Changes end here >>>>
    pipSideNavProvider: pip.nav.ISideNavProvider, 
    pipNavMenuProvider: pip.nav.INavMenuProvider, 
    pipAppBarProvider: pip.nav.IAppBarProvider, 
    pipNavIconProvider: pip.nav.INavIconProvider,
    pipActionsProvider: pip.nav.IActionsProvider, 
    pipBreadcrumbProvider: pip.nav.IBreadcrumbProvider
 ) {
 ...
// >>>> Changes start here >>>>
    $urlRouterProvider.otherwise("/nodes");
// >>>> Changes end here >>>>
} 
```

When you rebuild and reopen the application, you will see the following result:

![Page 4](artifacts/page4.png)

### Continue to step 5

[Go to step 5](https://github.com/pip-webui/pip-webui-tutorial/blob/master/step5/) to add the settings page.

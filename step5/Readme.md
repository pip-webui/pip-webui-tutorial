# Getting Started With Pip.WebUI <br/> Step 5. Add the settings page

[Go to step 4](https://github.com/pip-webui/pip-webui-tutorial/blob/master/step4/) if you haven't already, to add pages and navigation.

### Add the settings page

Add a **settings_sample.html** file with the settings tab view into the **/src/settings** folder:

```html
<h1>Welcome to Settings sample tab!</h1>
```

Then add configuration and the settings tab controller into the **settings_sample.ts** file in the **/src/settings** folder:

```javascript
'use strict';

function configureSampleTab(
    pipSettingsProvider: pip.settings.ISettingsProvider
) {
    pipSettingsProvider.addTab({
        state: 'sample',
        title: 'Sample config',
        auth: true,
        stateConfig: {
            url: '/sample',
            templateUrl: 'settings/settings_sample.html',
            controller: SettingsSampleController,
            controllerAs: 'vm'
        }
    });

    (<any>pipSettingsProvider).setDefaultTab('sample');
}

class SettingsSampleController {
    public constructor(
        pipNavService: pip.nav.INavService,
    ) {
        pipNavService.appbar.show();
        pipNavService.sidenav.show();
    }
}

angular
    .module('app.Settings.Sample', [ ])
    .config(configureSampleTab);
```

### Add references to the settings page into index.ts

Open the **index.ts** file and import files containing code for the settings page:

```javascript
'use strict';

import './nodes/nodes';
import './events/events';
// >>>> Changes start here >>>>
import './settings/settings_sample';
// >>>> Changes end here >>>>

...

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

        'app.Templates',
        'app.Events',
        'app.Nodes',
// >>>> Changes start here >>>>
        'app.Settings.Sample'
// >>>> Changes end here >>>>
    ])
    .config(configureApp)
    .controller('appController', AppController);
```

The settings page should look like this:
![Settings](artifacts/settings_page.png)

### Continue to step 6

[Go to step 6](https://github.com/pip-webui/pip-webui-tutorial/blob/master/step6/) to add the tile view to the Nodes page.

# Pip.WebUI Getting Started <br/> Step 5. Add settings page

[Go to step 4](https://github.com/pip-webui/pip-webui-sample/blob/master/step4/) to add pages and navigation.

### Add settings page

Add **settings_sample.html** file with settings tab view into **/src/settings** folder:

```html
<h1>Welcome to Settings sample tab!</h1>
```

Add configuration and settings tab controller into **settings_sample.ts** file into **/src/settings**:

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
    public constructor() {

    }
}

angular
    .module('app.Settings.Sample', [ ])
    .config(configureSampleTab);
```

### Add references to settings page into index.ts

Open **index.ts** file and import files containing code of settings page:

```javascript
'use strict';

import './nodes/nodes';
import './events/events';
import './settings/settings_sample';

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
        'app.Settings.Sample'
    ])
    .config(configureApp)
    .controller('appController', AppController);
```

Settings page:
![Settings](artifacts/settings_page.png)

### Continue

[Go to step 6](https://github.com/pip-webui/pip-webui-sample/blob/master/step6/) to add Nodes page with tiles view.

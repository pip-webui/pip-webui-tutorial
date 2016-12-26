# Pip.WebUI Getting Started <br/> Step 5. Add settings page

[Go to step 4](https://github.com/pip-webui/pip-webui-sample/blob/master/step4/) to add pages and navigation.

### Add settings page

Add **settings_sample.html** file with settings tab view into **/src** folder:

```html
<h1>Welcome to Settings sample tab!</h1>
```

Add configuration and settings tab controller into **settings_sample.ts** file:

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
            templateUrl: 'settings_sample.html',
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

import './nodes';
import './events';
import './settings_sample';

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
        'pipLoactions',

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

Todo: Add a screenshot of the help page. We shall also implement couple default pages similar to user settings (talk to AlexM)

### Continue

[Go to step 6](https://github.com/pip-webui/pip-webui-sample/blob/master/step6/) to add Nodes page with tiles view.

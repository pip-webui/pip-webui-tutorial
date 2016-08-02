# Pip.WebUI Getting Started <br/> Step 5. Add settings, support and help pages

[Go to step 4](https://github.com/pip-webui/pip-webui-sample/blob/master/step4/) to add sign in and sign up pages.

### Include entry pages into the application

Add **pipSettings**, **pipUserSettings**, **pipSupport** and **help** into the application module references

```javascript
var app = angular.module('app', [
        // pipWebUI modules
        'pipRest', 'pipErrorHandling', 'pipLayout', 'pipNav', 'pipEntry',
        'pipSettings', 'pipUserSettings', 'pipSupport', 'pipHelp',
        
        // Application templates
        'app.Templates'
]);
```

### Add link to go to Settings

To go to settings page add **Settings** link with such url:**/settings** to sidenav sections
It will look like this:

```javascript
pipSideNavProvider.sections([
    {
        links: [
            {title: 'Module 1', url: '/module_1'},
            {title: 'Module 2', url: '/module_2'}
        ]
    },
    {
        links: [
            {title: 'Settings', url: '/settings'},
            {title: 'Sign Out', url: '/signout'}
        ]
    }
]);
```

### Configure pip.WebUI components for determining the geolocation

For determining the geolocation by pip.WebUI components add such link to head tag of your **index.html**

```html
<head lang="en">
    ...
    
    <script src="http://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyBg6cm-FDBFPWzRcn39AuSHGQSrdtVIjEo"></script>
    
    ...
</head>
```

How to get **Google Map Key** you can read [here](https://developers.google.com/maps/documentation/javascript/get-api-key)

Or you can use my key at first time: AIzaSyBg6cm-FDBFPWzRcn39AuSHGQSrdtVIjEo

### Standard settings tabs and how to add specific tab

If you click **Settings** link in sidenav you will see page with list of default settings tabs:

* Basic info
* Active sessions

![Settings standard tabs](artifacts/settings_standard_tab.png)

### Add link to go to Help and configure help tabs

To go to help pages add **Help** link with such url:**/help** to sidenav sections
It will look like this:

```javascript
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
```

After you need to add specific **help** tab

```javascript
thisModule.config(
        function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider, pipAuthStateProvider, pipSettingsProvider, pipHelpProvider) {
        ...
        
        pipHelpProvider.addTab({
            state: 'specific_help_tab',
            title: 'Specific help tab',
            auth: true,
            stateConfig: {
                url: '/specific_help_tab',
                templateUrl: 'help_tab.html'
            }
        });
        
        ...
        }
);
```

Add template **help_tab.html** to your **/src** folder and you shall see:

```html
<div class="pip-details-title">
    <p class="pip-title">
        Specific help tab
    </p>

    <p class="pip-subtitle ">
        Here you can describe current help tab
    </p>

    <p>Here put information which can help users.</p>
</div>
```

And you shall see such page after click **help** link in sidenav:

![Help specific tab](artifacts/help_specific_tab.png)

### Continue

[Go to step 6](https://github.com/pip-webui/pip-webui-sample/blob/master/step6/) to add IoT Nodes page with tiles view to your application.

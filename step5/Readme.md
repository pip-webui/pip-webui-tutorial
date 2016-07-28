# Pip.WebUI Getting Started <br/> Step 5. Add settings and help

[Go to step 4](https://github.com/pip-webui/pip-webui-sample/blob/master/step4/Readme.md) to add sign in and sign up pages to your application

To initialize **settings** states was connected **pipSettings** in [step 2](https://github.com/pip-webui/pip-webui-sample/blob/master/step2/)
To initialize **help** states was connected **pipHelp** in [step 2](https://github.com/pip-webui/pip-webui-sample/blob/master/step2/)

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

For determining the geolocation by pipWebUI components add such link to head tag of your **index.html**

```markup
<head lang="en">
    ...
    <script src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    ...
</head>
```

Todo: describe how to get Google Map Key

If you click **Settings** link in sidenav you will see page with list of default settings tabs:

* Basic info
* Active sessions

![Settings standard tabs](artifacts/settings_standard_tab.png)

Todo: describe how to add settings tab

### Add link to go to Help

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

Todo: describe how to add help tab

### Continue
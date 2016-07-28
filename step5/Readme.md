# Pip.WebUI Getting Started <br/> Step 5. Add settings and help

[Go to step 4](https://github.com/pip-webui/pip-webui-sample/blob/master/step4/Readme.md) to add sign in and sign up pages to your application

To initialize **settings** states was connected **pipSettings** in [step 2](https://github.com/pip-webui/pip-webui-sample/blob/master/step2/)

#### Let's add settings and help tabs to your application

To go to settings pages add **Settings** link with such url:**/settings** to sidenav sections
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
    <script src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
</head>
```

### Continue
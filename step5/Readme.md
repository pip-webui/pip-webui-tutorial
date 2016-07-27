# Pip.WebUI Getting Started <br/> Step 5. Add settings and help

To initialize settings states was connected `pipSettings`

To go to settings pages add `Settings` link with such url:`/settings` to sidenav sections
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

For determining the geolocation by pipWebUI components add such link to head of your `index.html`

```markup
<head lang="en">
    <script src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
</head>
```
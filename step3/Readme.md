# Pip.WebUI Getting Started <br/> Step 3. Add appbar and sidenav

[Go to step 2](https://github.com/pip-webui/pip-webui-sample/blob/master/step2/Readme.md) to add Pip.WebUI libraries and create Angular boilerplate code in your application.

### Add navigation components to your index.html

Add **pip-main** tag in body of your **index.html**

```markup
<body ng-app="pipWebUISampleModule" ng-controller="pipWebUISampleController">

    <pip-main>

    </pip-main>

</body>
```

Add **pip-appbar** and **pip-sidenav** tags inside **pip-main** tag

```markup
<pip-main>
        <pip-appbar></pip-appbar>

        <pip-sidenav></pip-sidenav>
</pip-main>
```

You shall see such web page:

![navigation components](artifacts/navigation_components.png)

### Configure navigation components in your index.js

To configure appbar connect **pipAppBar** to **controller** in **index.js** and put inside code with configuration 

```javascript
thisModule.controller('pipWebUISampleController', function($scope, pipAppBar) {
        pipAppBar.showTitleText('Sample Application'); // Show title of application or specific page
        pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
        pipAppBar.showLocalActions(); // Show actions of your application
});
```

To configure secondary actions of your application use code like this (here we list links to states, which we will use in [step 4](https://github.com/pip-webui/pip-webui-sample/blob/master/step4/) and [step 5](https://github.com/pip-webui/pip-webui-sample/blob/master/step5/)):

```javascript
thisModule.config(function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider) {
    ...

    pipAppBarProvider.globalSecondaryActions([
        {name: 'global.settings', title: 'Settings', state: 'settings'},
        {name: 'global.signout', title: 'Sign out', state: 'signout'}
    ]);

    ... 
});
```

To display navigation icon in **appbar** connect angular-material **$mdIconProvider** to **config** in your **index.js** and put inside code with configuration

```javascript
thisModule.config(function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider) {
    ...
    
    $mdIconProvider.iconSet('icons', 'lib/images/icons.svg', 512);
    
    ...
});
```

After you shall see such **appbar**:

![Configured appbar](artifacts/configured_appbar.png)

And such **secondary actions menu**:

![Secondary actions](artifacts/secondary_actions.png)

To configure sidenav connect **pipSideNavProvider** to **config** in your **index.js** and put inside code with section configuration  

```javascript
thisModule.config(function (pipSideNavProvider) {
    ...
    
    pipSideNavProvider.sections([
        {
            links: [
                {title: 'Module 1', url: '/module_1'},
                {title: 'Module 2', url: '/module_2'}
            ]
        }
    ]);
    
    ...
});
```

To open sidenav click **menu navigation button** in left corner and you shall see such **sidenav**:

![Configured sidenav](artifacts/configured_sidenav.png)

To configure application logo, which displayed in appbar put your application logo file to **lib/images/**and configure it in **config** in your 'index.js':

```javascript
thisModule.config(function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider) {
    ...

    pipAppBarProvider.appTitleLogo('../lib/images/<your_logo_name>.<your_logo_format>');

    ... 
});
```

### Continue

[Go to step 4](https://github.com/pip-webui/pip-webui-sample/blob/master/step4/) to add sign in and sign up pages to your application.
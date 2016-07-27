# Pip.WebUI Getting Started <br/> Step 4. Add sign in and sign up

##### In [previous step](https://github.com/pip-webui/pip-webui-sample/blob/master/step3/Readme.md) we described how to configure navigation in your application using pip-webui components

#### Let's add sign in and sign up pages to your application

To initialize `signin` and `signup` states was connected `pipEntry`

To go to `signin` page add `Sign Out` link with such url:`/signout` to sidenav sections
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
            {title: 'Sign Out', url: '/signout'}
        ]
    }
]);
```

After add `pip-main-body` tag with ui-view attribute inside `pip-main` tag in your `index.html`

```markup
<pip-main>
        ...

        <pip-main-body ui-view></pip-main-body>
        
        ...
</pip-main>
```

Also you need to configure states to go to your application pages after `Sign in` or `Sign Up`

```javascript
thisModule.config(function (pipSideNavProvider, $mdIconProvider, pipAppBarProvider) {
    ...

     // Configure states of application
     pipAuthStateProvider
        .state('module_1', {
            url: '/module_1',
            controller: 'module1Controller',
            auth: true
        })
        .state('module_2', {
            url: '/module_2',
            controller: 'module2Controller',
            auth: true
        });
     
     // Configure default states
     pipAuthStateProvider.unauthorizedState('signin');
     pipAuthStateProvider.authorizedState('module_1');

    ... 
});
```

After add controllers for your states like this:

```javascript
thisModule.controller('module1Controller', function($scope, pipAppBar) {
    pipAppBar.showTitleText('Sample 1'); // Show title of application or specific page
    pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
    pipAppBar.showLocalActions(); // Show actions of your application
});

thisModule.controller('module2Controller', function($scope, pipAppBar) {
    pipAppBar.showTitleText('Sample 2'); // Show title of application or specific page
    pipAppBar.showMenuNavIcon(); // Show button in appbar, which open sidenav
    pipAppBar.showLocalActions(); // Show actions of your application
});
```

##### In [next step](https://github.com/pip-webui/pip-webui-sample/blob/master/step5/Readme.md) we will describe how to add settings and help pages to your application
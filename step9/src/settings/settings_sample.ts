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
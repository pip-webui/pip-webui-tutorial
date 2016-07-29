(function (angular) {
    var thisModule = angular.module('pipWebUISampleModule', [
        // pipWebUI modules
        'pipCore', 'pipRest', 'pipData', 'pipEntry', 'pipControls', 'pipLayout', 'pipNav',
        'pipLocations', 'pipPictures', 'pipDocuments', 'pipComposite', 'pipGuidance',
        'pipSettings', 'pipUserSettings', 'pipErrorHandling', 'pipSupport', 'pipHelp',

        // Application templates
        'SampleApplication.Templates'
    ]);
    
    thisModule.config(function () {

    });
    
    thisModule.controller('pipWebUISampleController', function($scope) {

    });
    
})(window.angular);

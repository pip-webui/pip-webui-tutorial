'use strict';

function configureApp() {
    // Todo: Add application configuration
}

class AppController {
    public greeting: string = "";

    public saySomething(): void {
        this.greeting = "Hello world!";
    }
};

angular
    .module('app', [
        // Add references here
    ])
    .config(configureApp)
    .controller('appController', AppController);
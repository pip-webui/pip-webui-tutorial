'use strict';

function configureEventRoutes(
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";

    // Configure module routes
    $stateProvider.state('events', {
        url: '/events',
        controller: EventsController,
        controllerAs: 'vm',
        templateUrl: 'events/events.html'
    });
}

export class IoTEvent {
    public icon: string;
    public node_id: string;
    public node_name: string;
    public description: string;
    public temperature: number;
    public rad_level: number;
}

export class EventsController {
    private _descriptions: string[] = ['Raised temperature', 'Lowered temperature', 'Change location'];
    private _icons: string[] = ['tr-errors', 'info-circle', 'location']

    public constructor(
        pipNavService: pip.nav.INavService,
        pipMedia: pip.layouts.IMediaService
    ) {
        pipNavService.appbar.show();
        pipNavService.sidenav.show();
        pipNavService.breadcrumb.text = "Events";
        this.pipMedia = pipMedia;

        this.events = this.generateEvents();
    }

    public pipMedia: pip.layouts.IMediaService;
    public events: IoTEvent[] = [];

    private random(min: number, max: number): number {
        return (Math.random() * (max - min) + min);
    }

    private generateEvents(): IoTEvent[] {
        let events: IoTEvent[] = [],
            eventsCount = 30,
            maxTemp = 50,
            minTemp = -50,
            maxRadLev = 150,
            minRadLevel = 80,
            maxNodeNum = 15;

        for (let i = 0; i < eventsCount; i++) {
            let randType = this.random(0, this._descriptions.length - 1).toFixed(0);

            events.push({
                icon: this._icons[randType],
                node_id: this.random(0, maxNodeNum).toFixed(0),
                node_name: 'Node ' + this.random(0, maxNodeNum).toFixed(0),
                description: this._descriptions[randType],
                temperature: this.random(minTemp, maxTemp),
                rad_level: this.random(minRadLevel, maxRadLev)
            });
        }

        return events;
    }

}

angular
    .module('app.Events', [ ])
    .config(configureEventRoutes);
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
        template: '<ui-view class="layout-row flex w-stretch"></ui-view>',
        abstract: true
    })
    .state('events.list', {
        url: '/list',
        controller: EventsListController,
        templateUrl: 'events/events_list.html'
    })
    .state('events.chart', {
        url: '/chart',
        controller: EventsChartController,
        controllerAs: 'vm',
        templateUrl: 'events/events_chart.html'
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

class TotalSeries {
    public label: string;
    public value: number;
}

class SeriesValue {
    value: number;
    x: any
}

class TimeSeries {
    public key: string;
    public values: SeriesValue[];
}

class EventsListController {
    public constructor(
        pipActions: pip.nav.IActionsService,
        $state: angular.ui.IStateService
    ) {
        pipActions.primaryLocalActions = [
            {
                name: 'events.chart',
                icon: 'icons:pie-chart',
                click: () => { $state.go('events.chart'); },
                subActions: []
            }
        ];
    }
}

class EventsChartController {
    public constructor(
        pipActions: pip.nav.IActionsService,
        $state: angular.ui.IStateService,
        $scope: any
    ) {
        pipActions.primaryLocalActions = [
            {
                name: 'events.list',
                icon: 'icons:list',
                click: () => { $state.go('events.list'); },
                subActions: []
            }
        ];

        this.events = $scope.$parent.vm.events;
        this.totalSeries = this.generateTotal();
        this.temperatureSeries = this.generateTimeSeries('temperature');
        this.radLevelSeries = this.generateTimeSeries('rad_level');
    }

    private generateTotal(): TotalSeries[] {
        let series: TotalSeries[] = [
            {label: 'Raised temperature', value: 0},
            {label: 'Lowered temperature', value: 0},
            {label: 'Change location', value: 0}
        ];

        _.each(this.events, (event) => {
            let index = _.findIndex(series, (s) => { return s.label == event.description; });
            series[index].value++;
        });

        return series;
    }

    private generateTimeSeries(type: string): TimeSeries[] {
        let node_count = 2;
        let event_count = this.events.length;
        let series: TimeSeries[] = [];

        for (let i = 0; i < node_count; i++) {
            series.push({ key: 'Node ' + (i + 1), values:[] });
            for (let j = 0; j < event_count / node_count; j++) {
                series[i].values.push({
                    value: this.events[(event_count / node_count) * i + j][type], 
                    x: new Date(2016, 11, j + 1)
                });
            }
        }

        console.log(type);
        console.log(series);
        return series;
    }

    public events: IoTEvent[] = [];
    public totalSeries: TotalSeries[] = [];
    public temperatureSeries: TimeSeries[] = [];
    public radLevelSeries: TimeSeries[] = [];

    // Format date of x axis
    public formatXTick(x) {
        let date = new Date(x);

        return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    }
}

angular
    .module('app.Events', [ ])
    .config(configureEventRoutes);
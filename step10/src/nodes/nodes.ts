'use strict';

function configureNodeRoutes(
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";

    // Configure module routes
    $stateProvider.state('nodes', {
        url: '/nodes',
        controller: NodesController,
        controllerAs: 'vm',
        template: '<ui-view class="layout-row flex w-stretch"></ui-view>',
        abstract: true
    })
    .state('nodes.tiles', {
        url: '/tiles', 
        controller: NodesTilesController,
        templateUrl: 'nodes/nodes_tiles.html'
    })
    .state('nodes.map', { 
        url: '/map',
        controller: NodesMapController,
        templateUrl: 'nodes/nodes_map.html'
    });
}

export class Point {
    type: string;
    coordinates: number[];
}

export class IoTNode {
    public name: string;
    public temperature: number;
    public radiation_level: number;
    public location: Point;
}

export class NodesController {
    public constructor(
        pipNavService: pip.nav.INavService
    ) {
        pipNavService.appbar.show();
        pipNavService.sidenav.show();
        pipNavService.breadcrumb.text = "Nodes";

        this.nodes = [
            { 
                name: 'Node 1', 
                temperature: 24, 
                radiation_level: 100,  
                location: { type: 'Point', coordinates: [32.393603, 110.982593] }
            },
            { 
                name: 'Node 2', 
                temperature: 24.5, 
                radiation_level: 104,  
                location: { type: 'Point', coordinates: [32.393603, -121.982593] }
            },
            { 
                name: 'Node 3', 
                temperature: 23, 
                radiation_level: 99,  
                location: { type: 'Point', coordinates: [32.393603, 120.982593] }
            }
        ];

        this.locationPoints = [
            this.nodes[0].location,
            this.nodes[1].location,
            this.nodes[2].location
        ];
    }

    public nodes: IoTNode[] = [];
    public locationPoints: Point[] = [];
}

class NodesTilesController {
    public constructor(
        pipActions: pip.nav.IActionsService,
        $state: angular.ui.IStateService
    ) {
        pipActions.primaryLocalActions = [
            {
                name: 'nodes.map',
                icon: 'icons:location',
                click: () => { $state.go('nodes.map'); },
                subActions: []
            }
        ];
    }
}

class NodesMapController {
    public constructor(
        pipActions: pip.nav.IActionsService,
        $state: angular.ui.IStateService
    ) {
        pipActions.primaryLocalActions = [
            {
                name: 'nodes.tiles',
                icon: 'icons:grid',
                click: () => { $state.go('nodes.tiles'); },
                subActions: []
            }
        ];
    }
}

angular
    .module('app.Nodes', [ ])
    .config(configureNodeRoutes);
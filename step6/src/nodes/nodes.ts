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
        templateUrl: 'nodes/nodes.html'
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
    }

    public nodes: IoTNode[] = [];
}

angular
    .module('app.Nodes', [ ])
    .config(configureNodeRoutes);
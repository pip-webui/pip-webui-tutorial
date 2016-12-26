# Pip.WebUI Getting Started <br/> Step 7. Add Events page with table view

[Go to step 6](https://github.com/pip-webui/pip-webui-sample/blob/master/step6/) to add Nodes page with tiles view.

### Create events table view

Replace content of **events.html** page with the content below. The page will show events from IoT nodes as a table on the Desktop and Table and as a list on Phones.

```html
<md-toolbar class="pip-appbar-ext">
</md-toolbar>

<pip-document>
    <div ng-show="$mdMedia('gt-xs')" class="scrolled-container">
        <table class="w-stretch">
            <thead class="color-secondary-text">
                <tr class="h48 text-left">
                    <th class="divider-bottom"><!--For icons--></th>
                    <th class="divider-bottom">Time</th>
                    <th class="divider-bottom">Node ID</th>
                    <th class="divider-bottom">Node Name</th>
                    <th class="divider-bottom">Description</th>
                    <th class="text-right divider-bottom">Temperature</th>
                    <th class="text-right rp16 divider-bottom">Radiation level</th>
                </tr>
            </thead>
            <tbody>
                <tr class="h48 text-subhead2 divider-bottom" ng-repeat="event in vm.events">
                    <td class="lp16 divider-bottom">
                        <md-icon ng-style="{color: iconColors[event.icon]}"
                                 md-svg-icon="icons:{{ event.icon }}">
                        </md-icon>
                    </td>
                    <td class="divider-bottom">00:00</td>
                    <td class="divider-bottom">{{ event.node_id }}</td>
                    <td class="divider-bottom">{{ event.node_name }}</td>
                    <td class="divider-bottom">{{ event.description }}</td>
                    <td class="text-right divider-bottom">{{ event.temperature }}</td>
                    <td class="text-right rp16 divider-bottom">{{ event.rad_level }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div ng-show="$mdMedia('xs')" class="scrolled-container">
        <div ng-repeat="event in vm.events" class="layout-row layout-align-start-center">
            <div class="flex-fixed lp16 rp16">
                <md-icon ng-style="{color: iconColors[event.icon]}"
                         md-svg-icon="icons:{{ event.icon }}">
                </md-icon>
            </div>
            <div class="flex layout-column layout-align-start-start divider-bottom color-secondary-text tp16 bp16">
                <div class="flex text-subhead2 w-stretch">
                    <span >Node {{ event.node_name }}</span> ⦁
                    <span >{{ event.description }}</span>
                </div>
                <div class="flex w-stretch">
                    <span >00:00</span> ⦁
                    <span >{{ event.temperature }}</span> ⦁
                    <span >{{ event.rad_level }}</span>
                </div>
            </div>
        </div>
    </div>
    <md-button class="md-fab md-accent md-fab-bottom-right" aria-label="refresh">
        <md-tooltip md-direction="left">Refresh</md-tooltip>
        <md-icon md-svg-icon="icons:reload"></md-icon>
    </md-button>
</pip-document>
```

### Update events controller

Update **events.ts** file with the following code:

```javascript
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
        templateUrl: 'events.html'
    });
}

class IoTEvent {
    public icon: string;
    public node_id: string;
    public node_name: string;
    public description: string;
    public temperature: number;
    public rad_level: number;
}

class EventsController {
    public constructor(
        pipBreadcrumb: pip.nav.IBreadcrumbService
    ) {
        pipBreadcrumb.text = "Events";

        this.events = [
            {
                icon: 'error',
                node_id: '111',
                node_name: 'Node 1',
                description: 'Raised temperature',
                temperature: 24.5,
                rad_level: 100
            },
            {
                icon: 'info',
                node_id: '111',
                node_name: 'Node 1',
                description: 'Lowered temperature',
                temperature: 23,
                rad_level: 101
            },
            {
                icon: 'location',
                node_id: '222',
                node_name: 'Node 2',
                description: 'Location changed',
                temperature: 24,
                rad_level: 104
            }
        ];
    }

    public events: IoTEvent[] = [];
}

angular
    .module('app.Events', [ ])
    .config(configureEventRoutes)
    .controller('eventsController', EventsController);
```

Add styles to **styles.less** in root folder
```css
table {
  border-collapse: collapse
}

.pip-document {
  .scrolled-container {
    overflow: auto;
  }
}
```

Rebuild and reopen the application. You shall see now:

![Maintenance Events](artifacts/maintenance_events.png)

Resize browser windows to the size of a phone:

![Maintenance Events mobile](artifacts/maintenance_events_mobile.png)

### Continue

[Go to step 8](https://github.com/pip-webui/pip-webui-sample/blob/master/step8/) to show notifications.

# Pip.WebUI Getting Started <br/> Step 8. Show notifications

[Go to step 7](https://github.com/pip-webui/pip-webui-sample/blob/master/step7/) to add Events page with table view.

### Show notifactions as toast messages

Here we are going to simulate incoming events and show them as toast messages.
Add the code below into **eventsController**

```javascript
thisModule.controller('eventsController', function($scope, pipAppBar, pipToasts, $interval) {
    ...
    
    var i = 0;
    var stopTime = $interval(addNextToast, 10000); // use angular $interval for imitation receiving messages every 10 sec.

    function addNextToast() { 
        if (i == $scope.events.length) {
            $interval.cancel(stopTime);
        } else {
            // Function to display notification
            pipToasts.showNotification('Node ' + $scope.events[i].node_id + ': ' + $scope.events[i].description);
            i++;
        }
    }

});
```

Rebuild the application. Now every 10 seconds you shall see a toast with event in the left bottom corner

![Notification](artifacts/notification.png)

### Continue

[Go to step 9](https://github.com/pip-webui/pip-webui-sample/blob/master/step9/) to add map view to Nodes page.

function testEventTriggering(eventType, event, actions) {
        let eventTriggered = false;

        states.addEventListener(eventType, function () { eventTriggered = true; });

        actions(event);

        return eventTriggered;
    }
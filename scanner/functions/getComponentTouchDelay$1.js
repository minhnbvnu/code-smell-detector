function getComponentTouchDelay$1(component) {
        var options = component.context.options;
        var delay = options.eventLongPressDelay;
        if (delay == null) {
            delay = options.longPressDelay;
        }
        return delay;
    }
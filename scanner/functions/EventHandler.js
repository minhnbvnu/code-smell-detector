function EventHandler() {
        var handlers = [];
        this.subscribe = function (event, handler) {
            handlers.push({
                event: event,
                handler: handler
            });
            event.subscribe(handler);
            return this; // allow chaining
        };
        this.unsubscribe = function (event, handler) {
            var i = handlers.length;
            while (i--) {
                if (handlers[i].event === event &&
                    handlers[i].handler === handler) {
                    handlers.splice(i, 1);
                    event.unsubscribe(handler);
                    return;
                }
            }
            return this; // allow chaining
        };
        this.unsubscribeAll = function () {
            var i = handlers.length;
            while (i--) {
                handlers[i].event.unsubscribe(handlers[i].handler);
            }
            handlers = [];
            return this; // allow chaining
        };
    }
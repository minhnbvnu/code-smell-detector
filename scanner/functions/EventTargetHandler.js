function EventTargetHandler() {
    var self = this;
    var events = [
        "loadstart",
        "progress",
        "abort",
        "error",
        "load",
        "timeout",
        "loadend"
    ];

    function addEventListener(eventName) {
        self.addEventListener(eventName, function(event) {
            var listener = self["on" + eventName];

            if (listener && typeof listener === "function") {
                listener.call(this, event);
            }
        });
    }

    events.forEach(addEventListener);
}
function fullscreenerror(oldEvent) {
        var newEvent = Mandreel_document.createEvent("CustomEvent");
        newEvent.initCustomEvent("fullscreenerror", true, false, null);
        // TODO: Any need for variable copy?
        Mandreel_document.dispatchEvent(newEvent);
    }
function fullscreenchange(oldEvent) {
        var newEvent = Mandreel_document.createEvent("CustomEvent");
        newEvent.initCustomEvent("fullscreenchange", true, false, null);
        // TODO: Any need for variable copy?
        Mandreel_document.dispatchEvent(newEvent);
    }
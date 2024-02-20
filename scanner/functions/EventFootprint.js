function EventFootprint(componentFootprint, eventDef, eventInstance) {
        this.componentFootprint = componentFootprint;
        this.eventDef = eventDef;
        if (eventInstance) {
            this.eventInstance = eventInstance;
        }
    }
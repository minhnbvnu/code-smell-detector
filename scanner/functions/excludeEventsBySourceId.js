function excludeEventsBySourceId(eventStore, sourceId) {
        return filterEventStoreDefs(eventStore, function (eventDef) {
            return eventDef.sourceId !== sourceId;
        });
    }
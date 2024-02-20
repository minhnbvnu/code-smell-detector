function buildEventUiBySource(eventSources) {
        return mapHash(eventSources, function (eventSource) {
            return eventSource.ui;
        });
    }
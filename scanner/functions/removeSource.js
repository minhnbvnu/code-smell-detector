function removeSource(eventSourceHash, sourceId) {
        return filterHash(eventSourceHash, function (eventSource) {
            return eventSource.sourceId !== sourceId;
        });
    }
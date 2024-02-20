function fetchDirtySources(sourceHash, fetchRange, calendar) {
        return fetchSourcesByIds(sourceHash, filterHash(sourceHash, function (eventSource) {
            return isSourceDirty(eventSource, fetchRange, calendar);
        }), fetchRange, calendar);
    }
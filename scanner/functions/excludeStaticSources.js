function excludeStaticSources(eventSources, calendar) {
        return filterHash(eventSources, function (eventSource) {
            return doesSourceNeedRange(eventSource, calendar);
        });
    }
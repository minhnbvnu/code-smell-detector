function doesSourceNeedRange(eventSource, calendar) {
        var defs = calendar.pluginSystem.hooks.eventSourceDefs;
        return !defs[eventSource.sourceDefId].ignoreRange;
    }
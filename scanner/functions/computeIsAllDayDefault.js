function computeIsAllDayDefault(sourceId, calendar) {
        var res = null;
        if (sourceId) {
            var source = calendar.state.eventSources[sourceId];
            res = source.allDayDefault;
        }
        if (res == null) {
            res = calendar.opt('allDayDefault');
        }
        return res;
    }
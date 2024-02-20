function computeEventForDateSpan(dateSpan, dragMeta, calendar) {
        var defProps = __assign({}, dragMeta.leftoverProps);
        for (var _i = 0, _a = calendar.pluginSystem.hooks.externalDefTransforms; _i < _a.length; _i++) {
            var transform = _a[_i];
            __assign(defProps, transform(dateSpan, dragMeta));
        }
        var def = core.parseEventDef(defProps, dragMeta.sourceId, dateSpan.allDay, calendar.opt('forceEventDuration') || Boolean(dragMeta.duration), // hasEnd
        calendar);
        var start = dateSpan.range.start;
        // only rely on time info if drop zone is all-day,
        // otherwise, we already know the time
        if (dateSpan.allDay && dragMeta.startTime) {
            start = calendar.dateEnv.add(start, dragMeta.startTime);
        }
        var end = dragMeta.duration ?
            calendar.dateEnv.add(start, dragMeta.duration) :
            calendar.getDefaultEventEnd(dateSpan.allDay, start);
        var instance = core.createEventInstance(def.defId, { start: start, end: end });
        return { def: def, instance: instance };
    }
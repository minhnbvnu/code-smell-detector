function applyMutationToEventDef(eventDef, eventConfig, mutation, appliers, calendar) {
        var standardProps = mutation.standardProps || {};
        // if hasEnd has not been specified, guess a good value based on deltas.
        // if duration will change, there's no way the default duration will persist,
        // and thus, we need to mark the event as having a real end
        if (standardProps.hasEnd == null &&
            eventConfig.durationEditable &&
            (mutation.startDelta || mutation.endDelta)) {
            standardProps.hasEnd = true; // TODO: is this mutation okay?
        }
        var copy = __assign({}, eventDef, standardProps, { ui: __assign({}, eventDef.ui, standardProps.ui) });
        if (mutation.extendedProps) {
            copy.extendedProps = __assign({}, copy.extendedProps, mutation.extendedProps);
        }
        for (var _i = 0, appliers_1 = appliers; _i < appliers_1.length; _i++) {
            var applier = appliers_1[_i];
            applier(copy, mutation, calendar);
        }
        if (!copy.hasEnd && calendar.opt('forceEventDuration')) {
            copy.hasEnd = true;
        }
        return copy;
    }
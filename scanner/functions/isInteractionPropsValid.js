function isInteractionPropsValid(state, calendar, dateSpanMeta, filterConfig) {
        var interaction = state.eventDrag; // HACK: the eventDrag props is used for ALL interactions
        var subjectEventStore = interaction.mutatedEvents;
        var subjectDefs = subjectEventStore.defs;
        var subjectInstances = subjectEventStore.instances;
        var subjectConfigs = compileEventUis(subjectDefs, interaction.isEvent ?
            state.eventUiBases :
            { '': calendar.selectionConfig } // if not a real event, validate as a selection
        );
        if (filterConfig) {
            subjectConfigs = mapHash(subjectConfigs, filterConfig);
        }
        var otherEventStore = excludeInstances(state.eventStore, interaction.affectedEvents.instances); // exclude the subject events. TODO: exclude defs too?
        var otherDefs = otherEventStore.defs;
        var otherInstances = otherEventStore.instances;
        var otherConfigs = compileEventUis(otherDefs, state.eventUiBases);
        for (var subjectInstanceId in subjectInstances) {
            var subjectInstance = subjectInstances[subjectInstanceId];
            var subjectRange = subjectInstance.range;
            var subjectConfig = subjectConfigs[subjectInstance.defId];
            var subjectDef = subjectDefs[subjectInstance.defId];
            // constraint
            if (!allConstraintsPass(subjectConfig.constraints, subjectRange, otherEventStore, state.businessHours, calendar)) {
                return false;
            }
            // overlap
            var overlapFunc = calendar.opt('eventOverlap');
            if (typeof overlapFunc !== 'function') {
                overlapFunc = null;
            }
            for (var otherInstanceId in otherInstances) {
                var otherInstance = otherInstances[otherInstanceId];
                // intersect! evaluate
                if (rangesIntersect(subjectRange, otherInstance.range)) {
                    var otherOverlap = otherConfigs[otherInstance.defId].overlap;
                    // consider the other event's overlap. only do this if the subject event is a "real" event
                    if (otherOverlap === false && interaction.isEvent) {
                        return false;
                    }
                    if (subjectConfig.overlap === false) {
                        return false;
                    }
                    if (overlapFunc && !overlapFunc(new EventApi(calendar, otherDefs[otherInstance.defId], otherInstance), // still event
                    new EventApi(calendar, subjectDef, subjectInstance) // moving event
                    )) {
                        return false;
                    }
                }
            }
            // allow (a function)
            var calendarEventStore = calendar.state.eventStore; // need global-to-calendar, not local to component (splittable)state
            for (var _i = 0, _a = subjectConfig.allows; _i < _a.length; _i++) {
                var subjectAllow = _a[_i];
                var subjectDateSpan = __assign({}, dateSpanMeta, { range: subjectInstance.range, allDay: subjectDef.allDay });
                var origDef = calendarEventStore.defs[subjectDef.defId];
                var origInstance = calendarEventStore.instances[subjectInstanceId];
                var eventApi = void 0;
                if (origDef) { // was previously in the calendar
                    eventApi = new EventApi(calendar, origDef, origInstance);
                }
                else { // was an external event
                    eventApi = new EventApi(calendar, subjectDef); // no instance, because had no dates
                }
                if (!subjectAllow(calendar.buildDateSpanApi(subjectDateSpan), eventApi)) {
                    return false;
                }
            }
        }
        return true;
    }
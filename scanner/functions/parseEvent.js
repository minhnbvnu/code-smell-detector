function parseEvent(raw, sourceId, calendar, allowOpenRange) {
        var allDayDefault = computeIsAllDayDefault(sourceId, calendar);
        var leftovers0 = {};
        var recurringRes = parseRecurring(raw, // raw, but with single-event stuff stripped out
        allDayDefault, calendar.dateEnv, calendar.pluginSystem.hooks.recurringTypes, leftovers0 // will populate with non-recurring props
        );
        if (recurringRes) {
            var def = parseEventDef(leftovers0, sourceId, recurringRes.allDay, Boolean(recurringRes.duration), calendar);
            def.recurringDef = {
                typeId: recurringRes.typeId,
                typeData: recurringRes.typeData,
                duration: recurringRes.duration
            };
            return { def: def, instance: null };
        }
        else {
            var leftovers1 = {};
            var singleRes = parseSingle(raw, allDayDefault, calendar, leftovers1, allowOpenRange);
            if (singleRes) {
                var def = parseEventDef(leftovers1, sourceId, singleRes.allDay, singleRes.hasEnd, calendar);
                var instance = createEventInstance(def.defId, singleRes.range, singleRes.forcedStartTzo, singleRes.forcedEndTzo);
                return { def: def, instance: instance };
            }
        }
        return null;
    }
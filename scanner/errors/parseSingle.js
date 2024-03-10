function parseSingle(raw, allDayDefault, calendar, leftovers, allowOpenRange) {
        var props = pluckDateProps(raw, leftovers);
        var allDay = props.allDay;
        var startMeta;
        var startMarker = null;
        var hasEnd = false;
        var endMeta;
        var endMarker = null;
        startMeta = calendar.dateEnv.createMarkerMeta(props.start);
        if (startMeta) {
            startMarker = startMeta.marker;
        }
        else if (!allowOpenRange) {
            return null;
        }
        if (props.end != null) {
            endMeta = calendar.dateEnv.createMarkerMeta(props.end);
        }
        if (allDay == null) {
            if (allDayDefault != null) {
                allDay = allDayDefault;
            }
            else {
                // fall back to the date props LAST
                allDay = (!startMeta || startMeta.isTimeUnspecified) &&
                    (!endMeta || endMeta.isTimeUnspecified);
            }
        }
        if (allDay && startMarker) {
            startMarker = startOfDay(startMarker);
        }
        if (endMeta) {
            endMarker = endMeta.marker;
            if (allDay) {
                endMarker = startOfDay(endMarker);
            }
            if (startMarker && endMarker <= startMarker) {
                endMarker = null;
            }
        }
        if (endMarker) {
            hasEnd = true;
        }
        else if (!allowOpenRange) {
            hasEnd = calendar.opt('forceEventDuration') || false;
            endMarker = calendar.dateEnv.add(startMarker, allDay ?
                calendar.defaultAllDayEventDuration :
                calendar.defaultTimedEventDuration);
        }
        return {
            allDay: allDay,
            hasEnd: hasEnd,
            range: { start: startMarker, end: endMarker },
            forcedStartTzo: startMeta ? startMeta.forcedTzo : null,
            forcedEndTzo: endMeta ? endMeta.forcedTzo : null
        };
    }
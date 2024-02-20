function getDraggedElMeta(el) {
    var prefix = exportHooks.dataAttrPrefix;
    var eventProps; // properties for creating the event, not related to date/time
    var startTime; // a Duration
    var duration;
    var stick;
    if (prefix) {
        prefix += '-';
    }
    eventProps = el.data(prefix + 'event') || null;
    if (eventProps) {
        if (typeof eventProps === 'object') {
            eventProps = $.extend({}, eventProps); // make a copy
        }
        else {
            eventProps = {};
        }
        // pluck special-cased date/time properties
        startTime = eventProps.start;
        if (startTime == null) {
            startTime = eventProps.time;
        } // accept 'time' as well
        duration = eventProps.duration;
        stick = eventProps.stick;
        delete eventProps.start;
        delete eventProps.time;
        delete eventProps.duration;
        delete eventProps.stick;
    }
    // fallback to standalone attribute values for each of the date/time properties
    if (startTime == null) {
        startTime = el.data(prefix + 'start');
    }
    if (startTime == null) {
        startTime = el.data(prefix + 'time');
    } // accept 'time' as well
    if (duration == null) {
        duration = el.data(prefix + 'duration');
    }
    if (stick == null) {
        stick = el.data(prefix + 'stick');
    }
    // massage into correct data types
    startTime = startTime != null ? moment.duration(startTime) : null;
    duration = duration != null ? moment.duration(duration) : null;
    stick = Boolean(stick);
    return { eventProps: eventProps, startTime: startTime, duration: duration, stick: stick };
}
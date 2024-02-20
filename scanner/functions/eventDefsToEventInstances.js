function eventDefsToEventInstances(eventDefs, unzonedRange) {
    var eventInstances = [];
    var i;
    for (i = 0; i < eventDefs.length; i++) {
        eventInstances.push.apply(eventInstances, // append
        eventDefs[i].buildInstances(unzonedRange));
    }
    return eventInstances;
}
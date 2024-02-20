function convertEventsPayloadToLegacyArray(eventsPayload) {
    var eventDefId;
    var eventInstances;
    var legacyEvents = [];
    var i;
    for (eventDefId in eventsPayload) {
        eventInstances = eventsPayload[eventDefId].eventInstances;
        for (i = 0; i < eventInstances.length; i++) {
            legacyEvents.push(eventInstances[i].toLegacy());
        }
    }
    return legacyEvents;
}
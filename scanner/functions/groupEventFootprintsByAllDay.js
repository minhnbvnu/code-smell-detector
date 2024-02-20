function groupEventFootprintsByAllDay(eventFootprints) {
    var allDay = [];
    var timed = [];
    var i;
    for (i = 0; i < eventFootprints.length; i++) {
        if (eventFootprints[i].componentFootprint.isAllDay) {
            allDay.push(eventFootprints[i]);
        }
        else {
            timed.push(eventFootprints[i]);
        }
    }
    return { allDay: allDay, timed: timed };
}
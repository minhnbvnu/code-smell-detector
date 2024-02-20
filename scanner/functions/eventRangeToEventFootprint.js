function eventRangeToEventFootprint(eventRange) {
    return new EventFootprint_1.default(new ComponentFootprint_1.default(eventRange.unzonedRange, eventRange.eventDef.isAllDay()), eventRange.eventDef, eventRange.eventInstance // might not exist
    );
}
function eventInstanceToEventRange(eventInstance) {
    return new EventRange_1.default(eventInstance.dateProfile.unzonedRange, eventInstance.def, eventInstance);
}
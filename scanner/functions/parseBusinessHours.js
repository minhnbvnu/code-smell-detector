function parseBusinessHours(input, calendar) {
        return parseEvents(refineInputs(input), '', calendar);
    }
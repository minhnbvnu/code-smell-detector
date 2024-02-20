function createCalendarSystem(name) {
        return new calendarSystemClassMap[name]();
    }
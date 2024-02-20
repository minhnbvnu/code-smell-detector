function EventManager(calendar) {
        this.calendar = calendar;
        this.stickySource = new ArrayEventSource_1.default(calendar);
        this.otherSources = [];
    }
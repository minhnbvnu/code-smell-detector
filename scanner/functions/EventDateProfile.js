function EventDateProfile(start, end, calendar) {
        this.start = start;
        this.end = end || null;
        this.unzonedRange = this.buildUnzonedRange(calendar);
    }
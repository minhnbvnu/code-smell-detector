function computeActiveRange(dateProfile, isComponentAllDay) {
        var range = dateProfile.activeRange;
        if (isComponentAllDay) {
            return range;
        }
        return {
            start: addMs(range.start, dateProfile.minTime.milliseconds),
            end: addMs(range.end, dateProfile.maxTime.milliseconds - 864e5) // 864e5 = ms in a day
        };
    }
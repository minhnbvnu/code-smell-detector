function computeTitle(dateProfile, viewOptions) {
        var range;
        // for views that span a large unit of time, show the proper interval, ignoring stray days before and after
        if (/^(year|month)$/.test(dateProfile.currentRangeUnit)) {
            range = dateProfile.currentRange;
        }
        else { // for day units or smaller, use the actual day range
            range = dateProfile.activeRange;
        }
        return this.context.dateEnv.formatRange(range.start, range.end, createFormatter(viewOptions.titleFormat || computeTitleFormat(dateProfile), viewOptions.titleRangeSeparator), { isEndExclusive: dateProfile.isRangeAllDay });
    }
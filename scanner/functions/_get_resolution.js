function _get_resolution(resolution_secs, span_secs) {
        // Our resolution boundaries should not be round numbers, because we want
        // them to fall between the possible tick intervals (which *are* round
        // numbers, as we've worked hard to ensure).  Consequently, we adjust the
        // resolution upwards a small amount (less than any possible step in
        // scales) to make the effective boundaries slightly lower.
        const adjusted_ms = resolution_secs * 1.1 * 1000;
        const span_ms = span_secs * 1000;
        if (adjusted_ms < util_1.ONE_MILLI)
            return "microseconds";
        if (adjusted_ms < util_1.ONE_SECOND)
            return "milliseconds";
        if (adjusted_ms < util_1.ONE_MINUTE)
            return span_ms >= util_1.ONE_MINUTE ? "minsec" : "seconds";
        if (adjusted_ms < util_1.ONE_HOUR)
            return span_ms >= util_1.ONE_HOUR ? "hourmin" : "minutes";
        if (adjusted_ms < util_1.ONE_DAY)
            return "hours";
        if (adjusted_ms < util_1.ONE_MONTH)
            return "days";
        if (adjusted_ms < util_1.ONE_YEAR)
            return "months";
        return "years";
    }
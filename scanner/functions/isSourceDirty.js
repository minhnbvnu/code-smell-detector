function isSourceDirty(eventSource, fetchRange, calendar) {
        if (!doesSourceNeedRange(eventSource, calendar)) {
            return !eventSource.latestFetchId;
        }
        else {
            return !calendar.opt('lazyFetching') ||
                !eventSource.fetchRange ||
                eventSource.isFetching || // always cancel outdated in-progress fetches
                fetchRange.start < eventSource.fetchRange.start ||
                fetchRange.end > eventSource.fetchRange.end;
        }
    }
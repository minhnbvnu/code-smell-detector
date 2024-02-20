function isAppliedFilter(filter, value) {
        return filter === null || filter(value);
    }
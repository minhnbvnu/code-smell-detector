function isDescribeWithSkip(value) {
        return (typeof value === 'object' &&
            value != null &&
            'skip' in value &&
            typeof value.skip === 'function');
    }
function originalPositionTryBoth(sourceMap, line, column) {
    const mapping = sourceMap.originalPositionFor({
        line,
        column,
        bias: GREATEST_LOWER_BOUND
    });
    if (mapping.source === null) {
        return sourceMap.originalPositionFor({
            line,
            column,
            bias: LEAST_UPPER_BOUND
        });
    } else {
        return mapping;
    }
}
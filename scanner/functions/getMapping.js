function getMapping(sourceMap, generatedLocation, origFile) {
    if (!generatedLocation) {
        return null;
    }

    if (
        isInvalidPosition(generatedLocation.start) ||
        isInvalidPosition(generatedLocation.end)
    ) {
        return null;
    }

    const start = originalPositionTryBoth(
        sourceMap,
        generatedLocation.start.line,
        generatedLocation.start.column
    );
    let end = originalEndPositionFor(sourceMap, generatedLocation.end);

    /* istanbul ignore if: edge case too hard to test for */
    if (!(start && end)) {
        return null;
    }

    if (!(start.source && end.source)) {
        return null;
    }

    if (start.source !== end.source) {
        return null;
    }

    /* istanbul ignore if: edge case too hard to test for */
    if (start.line === null || start.column === null) {
        return null;
    }

    /* istanbul ignore if: edge case too hard to test for */
    if (end.line === null || end.column === null) {
        return null;
    }

    if (start.line === end.line && start.column === end.column) {
        end = sourceMap.originalPositionFor({
            line: generatedLocation.end.line,
            column: generatedLocation.end.column,
            bias: LEAST_UPPER_BOUND
        });
        end.column -= 1;
    }

    return {
        source: pathutils.relativeTo(start.source, origFile),
        loc: {
            start: {
                line: start.line,
                column: start.column
            },
            end: {
                line: end.line,
                column: end.column
            }
        }
    };
}
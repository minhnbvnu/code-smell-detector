function originalEndPositionFor(sourceMap, generatedEnd) {
    // Given the generated location, find the original location of the mapping
    // that corresponds to a range on the generated file that overlaps the
    // generated file end location. Note however that this position on its
    // own is not useful because it is the position of the _start_ of the range
    // on the original file, and we want the _end_ of the range.
    const beforeEndMapping = originalPositionTryBoth(
        sourceMap,
        generatedEnd.line,
        generatedEnd.column - 1
    );
    if (beforeEndMapping.source === null) {
        return null;
    }

    // Convert that original position back to a generated one, with a bump
    // to the right, and a rightward bias. Since 'generatedPositionFor' searches
    // for mappings in the original-order sorted list, this will find the
    // mapping that corresponds to the one immediately after the
    // beforeEndMapping mapping.
    const afterEndMapping = sourceMap.generatedPositionFor({
        source: beforeEndMapping.source,
        line: beforeEndMapping.line,
        column: beforeEndMapping.column + 1,
        bias: LEAST_UPPER_BOUND
    });
    if (
        // If this is null, it means that we've hit the end of the file,
        // so we can use Infinity as the end column.
        afterEndMapping.line === null ||
        // If these don't match, it means that the call to
        // 'generatedPositionFor' didn't find any other original mappings on
        // the line we gave, so consider the binding to extend to infinity.
        sourceMap.originalPositionFor(afterEndMapping).line !==
            beforeEndMapping.line
    ) {
        return {
            source: beforeEndMapping.source,
            line: beforeEndMapping.line,
            column: Infinity
        };
    }

    // Convert the end mapping into the real original position.
    return sourceMap.originalPositionFor(afterEndMapping);
}
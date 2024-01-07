function applyAlignmentAndPadding(lines, sizes, positions) {
        const alignmentA = options.alignment[a.axis];
        const alignmentB = options.alignment[b.axis];

        const paddingA = options.padding[a.axis];
        const paddingB = options.padding[b.axis];

        for (let lineIndex = 0; lineIndex < lines.length; ++lineIndex) {
            const line = lines[lineIndex];
            const sizesThisLine = sizes[lineIndex];
            const positionsThisLine = positions[lineIndex];

            const axisAOffset = (availableSpace[a.axis] - line[a.size])  * alignmentA + paddingA;
            const axisBOffset = (availableSpace[b.axis] - lines[b.size]) * alignmentB + paddingB;

            for (let elementIndex = 0; elementIndex < line.length; ++elementIndex) {
                const withinLineAxisBOffset = (line[b.size] - sizesThisLine[elementIndex][b.size]) * options.alignment[b.axis];

                positionsThisLine[elementIndex][a.axis] += axisAOffset;
                positionsThisLine[elementIndex][b.axis] += axisBOffset + withinLineAxisBOffset;
            }
        }
    }
function applySizesAndPositions(lines, sizes, positions) {
        for (let lineIndex = 0; lineIndex < lines.length; ++lineIndex) {
            const line = lines[lineIndex];
            const sizesThisLine = sizes[lineIndex];
            const positionsThisLine = positions[lineIndex];

            for (let elementIndex = 0; elementIndex < line.length; ++elementIndex) {
                const element = line[elementIndex];

                element[a.calculatedSize] = sizesThisLine[elementIndex][a.size];
                element[b.calculatedSize] = sizesThisLine[elementIndex][b.size];

                if (options.orientation === ORIENTATION_HORIZONTAL) {
                    element.entity.setLocalPosition(
                        positionsThisLine[elementIndex][a.axis],
                        positionsThisLine[elementIndex][b.axis],
                        element.entity.getLocalPosition().z
                    );
                } else {
                    element.entity.setLocalPosition(
                        positionsThisLine[elementIndex][b.axis],
                        positionsThisLine[elementIndex][a.axis],
                        element.entity.getLocalPosition().z
                    );
                }
            }
        }
    }
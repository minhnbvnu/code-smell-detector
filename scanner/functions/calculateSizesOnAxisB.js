function calculateSizesOnAxisB(lines, sizesAllLines) {
        const largestElementsForEachLine = [];
        const largestSizesForEachLine = [];

        // Find the largest element on each line.
        for (let lineIndex = 0; lineIndex < lines.length; ++lineIndex) {
            const line = lines[lineIndex];
            line.largestElement = null;
            line.largestSize = { width: Number.NEGATIVE_INFINITY, height: Number.NEGATIVE_INFINITY };

            // Find the largest element on this line.
            for (let elementIndex = 0; elementIndex < line.length; ++elementIndex) {
                const sizesThisElement = sizesAllLines[lineIndex][elementIndex];

                if (sizesThisElement[b.size] > line.largestSize[b.size]) {
                    line.largestElement = line[elementIndex];
                    line.largestSize = sizesThisElement;
                }
            }

            largestElementsForEachLine.push(line.largestElement);
            largestSizesForEachLine.push(line.largestSize);
        }

        // Calculate line heights using the largest element on each line.
        const idealRequiredSpace = calculateTotalSpace(largestSizesForEachLine, b);
        const fittingAction = determineFittingAction(options[b.fitting], idealRequiredSpace, availableSpace[b.axis]);

        if (fittingAction === FITTING_ACTION.APPLY_STRETCHING) {
            stretchSizesToFitContainer(largestSizesForEachLine, idealRequiredSpace, b);
        } else if (fittingAction === FITTING_ACTION.APPLY_SHRINKING) {
            shrinkSizesToFitContainer(largestSizesForEachLine, idealRequiredSpace, b);
        }

        // Calculate sizes for other elements based on the height of the line they're on.
        for (let lineIndex = 0; lineIndex < lines.length; ++lineIndex) {
            const line = lines[lineIndex];

            for (let elementIndex = 0; elementIndex < line.length; ++elementIndex) {
                const sizesForThisElement = sizesAllLines[lineIndex][elementIndex];
                const currentSize = sizesForThisElement[b.size];
                const availableSize = lines.length === 1 ? availableSpace[b.axis] : line.largestSize[b.size];
                const elementFittingAction = determineFittingAction(options[b.fitting], currentSize, availableSize);

                if (elementFittingAction === FITTING_ACTION.APPLY_STRETCHING) {
                    sizesForThisElement[b.size] = Math.min(availableSize, sizesForThisElement[b.maxSize]);
                } else if (elementFittingAction === FITTING_ACTION.APPLY_SHRINKING) {
                    sizesForThisElement[b.size] = Math.max(availableSize, sizesForThisElement[b.minSize]);
                }
            }
        }

        return sizesAllLines;
    }
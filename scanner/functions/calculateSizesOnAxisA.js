function calculateSizesOnAxisA(lines) {
        const sizesAllLines = [];

        for (let lineIndex = 0; lineIndex < lines.length; ++lineIndex) {
            const line = lines[lineIndex];
            const sizesThisLine = getElementSizeProperties(line);
            const idealRequiredSpace = calculateTotalSpace(sizesThisLine, a);
            const fittingAction = determineFittingAction(options[a.fitting], idealRequiredSpace, availableSpace[a.axis]);

            if (fittingAction === FITTING_ACTION.APPLY_STRETCHING) {
                stretchSizesToFitContainer(sizesThisLine, idealRequiredSpace, a);
            } else if (fittingAction === FITTING_ACTION.APPLY_SHRINKING) {
                shrinkSizesToFitContainer(sizesThisLine, idealRequiredSpace, a);
            }

            sizesAllLines.push(sizesThisLine);
        }

        return sizesAllLines;
    }
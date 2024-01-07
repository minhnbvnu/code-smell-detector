function stretchSizesToFitContainer(sizesThisLine, idealRequiredSpace, axis) {
        const ascendingMaxSizeOrder = getTraversalOrder(sizesThisLine, axis.maxSize);
        const fittingProportions = getNormalizedValues(sizesThisLine, axis.fittingProportion);
        const fittingProportionSums = createSumArray(fittingProportions, ascendingMaxSizeOrder);

        // Start by working out how much we have to stretch the child elements by
        // in total in order to fill the available space in the container
        let remainingUndershoot = availableSpace[axis.axis] - idealRequiredSpace;

        for (let i = 0; i < sizesThisLine.length; ++i) {
            // As some elements may have a maximum size defined, we might not be
            // able to scale all elements by the ideal amount necessary in order
            // to fill the available space. To account for this, we run through
            // the elements in ascending order of their maximum size, redistributing
            // any remaining space to the other elements that are more able to
            // make use of it.
            const index = ascendingMaxSizeOrder[i];

            // Work out how much we ideally want to stretch this element by, based
            // on the amount of space remaining and the fitting proportion value that
            // was specified.
            const targetIncrease = calculateAdjustment(index, remainingUndershoot, fittingProportions, fittingProportionSums);
            const targetSize = sizesThisLine[index][axis.size] + targetIncrease;

            // Work out how much we're actually able to stretch this element by,
            // based on its maximum size, and apply the result.
            const maxSize = sizesThisLine[index][axis.maxSize];
            const actualSize = Math.min(targetSize, maxSize);

            sizesThisLine[index][axis.size] = actualSize;

            // Work out how much of the total undershoot value we've just used,
            // and decrement the remaining value by this much.
            const actualIncrease = Math.max(targetSize - actualSize, 0);
            const appliedIncrease = targetIncrease - actualIncrease;

            remainingUndershoot -= appliedIncrease;
        }
    }
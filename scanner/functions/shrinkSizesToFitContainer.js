function shrinkSizesToFitContainer(sizesThisLine, idealRequiredSpace, axis) {
        const descendingMinSizeOrder = getTraversalOrder(sizesThisLine, axis.minSize, true);
        const fittingProportions = getNormalizedValues(sizesThisLine, axis.fittingProportion);
        const inverseFittingProportions = invertNormalizedValues(fittingProportions);
        const inverseFittingProportionSums = createSumArray(inverseFittingProportions, descendingMinSizeOrder);

        let remainingOvershoot = idealRequiredSpace - availableSpace[axis.axis];

        for (let i = 0; i < sizesThisLine.length; ++i) {
            const index = descendingMinSizeOrder[i];

            // Similar to the stretch calculation above, we calculate the ideal
            // size reduction value for this element based on its fitting proportion.
            // However, note that we're using the inverse of the fitting value, as
            // using the regular value would mean that an element with a fitting
            // value of, say, 0.4, ends up rendering very small when shrinking is
            // being applied. Using the inverse means that the balance of sizes
            // between elements is similar for both the Stretch and Shrink modes.
            const targetReduction = calculateAdjustment(index, remainingOvershoot, inverseFittingProportions, inverseFittingProportionSums);
            const targetSize = sizesThisLine[index][axis.size] - targetReduction;

            const minSize = sizesThisLine[index][axis.minSize];
            const actualSize = Math.max(targetSize, minSize);

            sizesThisLine[index][axis.size] = actualSize;

            const actualReduction = Math.max(actualSize - targetSize, 0);
            const appliedReduction = targetReduction - actualReduction;

            remainingOvershoot -= appliedReduction;
        }
    }
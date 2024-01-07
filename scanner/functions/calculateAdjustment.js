function calculateAdjustment(index, remainingAdjustment, fittingProportions, fittingProportionSums) {
        const proportion = fittingProportions[index];
        const sumOfRemainingProportions = fittingProportionSums[index];

        if (Math.abs(proportion) < 1e-5 && Math.abs(sumOfRemainingProportions) < 1e-5) {
            return remainingAdjustment;
        }

        return remainingAdjustment * proportion / sumOfRemainingProportions;
    }
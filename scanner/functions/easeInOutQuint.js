function easeInOutQuint(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * Math.pow(currentIteration, 5) + startValue;
	}
	return changeInValue / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
}
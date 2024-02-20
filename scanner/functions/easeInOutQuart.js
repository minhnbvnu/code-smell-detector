function easeInOutQuart(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * Math.pow(currentIteration, 4) + startValue;
	}
	return -changeInValue/2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
}
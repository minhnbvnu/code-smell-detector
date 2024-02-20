function easeInOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
	}
	return changeInValue / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
}
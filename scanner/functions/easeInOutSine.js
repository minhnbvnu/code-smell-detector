function easeInOutSine(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue;
}
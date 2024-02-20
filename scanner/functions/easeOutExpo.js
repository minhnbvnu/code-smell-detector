function easeOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
}
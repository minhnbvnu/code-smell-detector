function easeInSine(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (1 - Math.cos(currentIteration / totalIterations * (Math.PI / 2))) + startValue;
}
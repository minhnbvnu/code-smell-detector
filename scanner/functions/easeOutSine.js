function easeOutSine(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.sin(currentIteration / totalIterations * (Math.PI / 2)) + startValue;
}
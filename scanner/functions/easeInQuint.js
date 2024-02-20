function easeInQuint(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.pow (currentIteration / totalIterations, 5) + startValue;
}
function easeInQuart(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.pow (currentIteration / totalIterations, 4) + startValue;
}
function easeOutQuint(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) + startValue;
}
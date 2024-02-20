function easeOutQuart(currentIteration, startValue, changeInValue, totalIterations) {
	return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue;
}
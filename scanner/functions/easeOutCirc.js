function easeOutCirc(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.sqrt(1 - (currentIteration = currentIteration / totalIterations - 1) * currentIteration) + startValue;
}
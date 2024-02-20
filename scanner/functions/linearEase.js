function linearEase(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * currentIteration / totalIterations + startValue;
}
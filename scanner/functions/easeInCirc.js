function easeInCirc(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (1 - Math.sqrt(1 - (currentIteration /= totalIterations) * currentIteration)) + startValue;
}
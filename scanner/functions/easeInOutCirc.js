function easeInOutCirc(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
	}
	return changeInValue / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
}
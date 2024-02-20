function bloom(threshold, horizontal, vertical, boost, samplerNum, taps, reps) {
    return new BloomLoop(expr_1.wrapInValue(threshold), expr_1.wrapInValue(horizontal), expr_1.wrapInValue(vertical), expr_1.wrapInValue(boost), samplerNum, taps, reps);
}
function EmptyPredictionContext() {
	SingletonPredictionContext.call(this, null, PredictionContext.EMPTY_RETURN_STATE);
	return this;
}
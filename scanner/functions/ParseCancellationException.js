function ParseCancellationException() {
	Error.call(this);
	Error.captureStackTrace(this, ParseCancellationException);
	return this;
}
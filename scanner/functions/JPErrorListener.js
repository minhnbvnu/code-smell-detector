function JPErrorListener(errorCallback) {
	ErrorListener.call(this);
	this.errorCallback = errorCallback;
	return this;
}
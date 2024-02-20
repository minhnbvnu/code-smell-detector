function ImplementationError(code, message) {
	Error.captureStackTrace(this);
	this.code = code;
	this.message = message || "";
}
function FatalError(message, code) {
	Error.captureStackTrace(this);
	this.message = message || "";
	this.code = code || 'NODE_RDP_CORE_ERROR_NO_ERROR_CODE';
}
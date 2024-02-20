function ApiError(type, message, path$$1) {
	        if ( message === void 0 ) message = ErrorStrings[type];
	
	        Error.call(this, message);
	        // Unsupported.
	        this.syscall = "";
	        this.errno = type;
	        this.code = ErrorCode[type];
	        this.path = path$$1;
	        this.stack = new Error().stack;
	        this.message = "Error: " + (this.code) + ": " + message + (this.path ? (", '" + (this.path) + "'") : '');
	    }
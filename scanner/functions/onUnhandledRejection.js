function onUnhandledRejection(reason, promise) {
		unhandledRejections.push({reason: reason, promise: promise});
	}
function handlePossibleError() {
			if (typeof window[callbackName] === 'function') {
				response.error = 'loaderror';
				clearProperty(window, callbackName);
				cleanupScriptNode(response);
				reject(response);
			}
		}
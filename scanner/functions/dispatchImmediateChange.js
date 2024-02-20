function dispatchImmediateChange() {
			if (THIS.onImmediateChange) {
				var callback;
				if (typeof THIS.onImmediateChange === 'string') {
					callback = new Function (THIS.onImmediateChange);
				} else {
					callback = THIS.onImmediateChange;
				}
				callback.call(THIS);
			}
		}
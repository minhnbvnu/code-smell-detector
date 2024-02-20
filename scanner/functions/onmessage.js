function onmessage(ev) {
			var msg = ev.data;
			if (msg.error) {
				worker.terminate(); // should before onerror(), because onerror() may throw.
				onerror(msg.error);
				return;
			}
			if (msg.type === 'importScripts') {
				worker.removeEventListener('message', onmessage);
				worker.removeEventListener('error', errorHandler);
				callback(worker);
			}
		}
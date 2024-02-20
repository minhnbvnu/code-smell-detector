function drawDeferred() {
			var callLength = deferredRenderCalls.length,
				callIndex;

			// Draw all pending render calls
			for (callIndex = 0; callIndex < callLength; callIndex++) {
				deferredRenderCalls[callIndex]();
			}
			// Clear the list
			deferredRenderCalls = [];
		}
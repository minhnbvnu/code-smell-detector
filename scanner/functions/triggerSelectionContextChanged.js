function triggerSelectionContextChanged(rangeObject, event) {
		var startContainer = rangeObject.startContainer;
		var endContainer = rangeObject.endContainer;
		if (!startContainer || !endContainer) {
			console.warn("aloha/selection", "encountered range object without start or end container");
			return;
		}
		var startContext = getChangedContext(startContainer, prevStartContext);
		var endContext = getChangedContext(endContainer, prevEndContext);
		if (!startContext && !endContext) {
			return;
		}
		prevStartContext = startContext;
		prevEndContext = endContext;

		/**
		 * @api documented in the guides
		 */
		PubSub.pub('aloha.selection.context-change', {
			range: rangeObject,
			event: event
		});
	}
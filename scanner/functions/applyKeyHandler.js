function applyKeyHandler(handler, context, args, event) {
		// Don't fire in text-accepting inputs that we didn't directly bind to
		if (context !== event.target && (/textarea|input|select/i.test(event.target.nodeName) || event.target.type === "text")) {
			return;
		}
		return handler.apply(context, args);
	}
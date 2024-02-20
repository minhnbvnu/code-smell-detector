function proxy_keyboard_events(iframe) {
	// Note: iframe must be same-origin, or this will fail.
	for (const event_type of ["keyup", "keydown", "keypress"]) {
		iframe.contentWindow.addEventListener(event_type, (event) => {
			const proxied_event = new KeyboardEvent(event_type, {
				target: iframe,
				view: iframe.ownerDocument.defaultView,
				bubbles: true,
				cancelable: true,
				key: event.key,
				keyCode: event.keyCode,
				which: event.which,
				code: event.code,
				shiftKey: event.shiftKey,
				ctrlKey: event.ctrlKey,
				metaKey: event.metaKey,
				altKey: event.altKey,
				repeat: event.repeat,
				//...@TODO: should it copy ALL properties?
			});
			const result = iframe.dispatchEvent(proxied_event);
			// console.log("proxied", event, "as", proxied_event, "result", result);
			if (!result) {
				event.preventDefault();
			}
		}, true);
	}
}
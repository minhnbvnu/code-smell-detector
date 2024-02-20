function keyPressHandler(event) {
		if (!overrides) {
			return;
		}
		if (event.altKey || event.ctrlKey || !event.which) {
			return;
		}
		var selection = Aloha.getSelection();
		if (!selection.getRangeCount()) {
			return;
		}
		var text = String.fromCharCode(event.which);
		var range = selection.getRangeAt(0);
		Dom.insertSelectText(text, range);
		Maps.forEach(overrides, function (formatFn, command) {
			formatFn(command, range);
		});
		Dom.collapseToEnd(range);
		selection.removeAllRanges();
		selection.addRange(range);
		// Because we handled the character insert ourselves via
		// insertText we must not let the browser's default action
		// insert the character a second time.
		event.preventDefault();
	}
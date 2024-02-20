function onKeydown($event) {
		if (!Aloha.activeEditable) {
			return;
		}
		var key = KEYCODES[$event.which];
		if (key) {
			var modifier = keyModifier($event);
			var combo = (modifier ? modifier + '+' : '') + key;
			if (keyBindings[combo]) {
				return keyBindings[combo]($event);
			}
		}
	}
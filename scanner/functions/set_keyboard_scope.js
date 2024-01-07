function set_keyboard_scope(...elements) {
		for (const el of keyboard_scope_elements) {
			el.removeEventListener("keydown", keyboard_scope_keydown);
		}
		keyboard_scope_elements = elements;
		for (const el of keyboard_scope_elements) {
			el.addEventListener("keydown", keyboard_scope_keydown);
		}
	}
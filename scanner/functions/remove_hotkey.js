function remove_hotkey(text) {
	return text.replace(/\s?\(&.\)/, "").replace(/([^&]|^)&([^&\s])/, "$1$2");
}
function display_hotkey(text) {
	// misnomer: using .menu-hotkey out of laziness, instead of a more general term like .hotkey or .accelerator
	return `<span style="white-space: pre">${text.replace(/([^&]|^)&([^&\s])/, "$1<span class='menu-hotkey'>$2</span>").replace(/&&/g, "&")}</span>`;
}
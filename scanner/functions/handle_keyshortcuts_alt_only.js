function handle_keyshortcuts_alt_only($container) {
	$container.on("keydown", (event)=> {
		if (event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
			let shortcut_target = $container.find(`[aria-keyshortcuts="Alt+${event.key.toUpperCase()}"]`)[0];
			if (shortcut_target) {
				event.preventDefault();
				event.stopPropagation();
				if (shortcut_target.disabled) {
					shortcut_target = shortcut_target.closest(".radio-wrapper");
				}
				shortcut_target.click();
				shortcut_target.focus();
			}
		}
	});
}
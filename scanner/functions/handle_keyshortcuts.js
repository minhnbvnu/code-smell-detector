function handle_keyshortcuts($container) {
	// This function implements shortcuts defined with aria-keyshortcuts.
	// It also modifies aria-keyshortcuts to remove shortcuts that don't
	// contain a modifier (other than shift) when an input field is focused,
	// in order to avoid conflicts with typing.
	// It stores the original aria-keyshortcuts (indefinitely), so if aria-keyshortcuts
	// is ever to be modified at runtime (externally), the code here may need to be changed.

	$container.on("keydown", (event) => {
		const $targets = $container.find("[aria-keyshortcuts]");
		for (let shortcut_target of $targets) {
			const shortcuts = $(shortcut_target).attr("aria-keyshortcuts").split(" ");
			for (const shortcut of shortcuts) {
				// TODO: should we use code instead of key? need examples
				if (
					!!shortcut.match(/Alt\+/i) === event.altKey &&
					!!shortcut.match(/Ctrl\+/i) === event.ctrlKey &&
					!!shortcut.match(/Meta\+/i) === event.metaKey &&
					!!shortcut.match(/Shift\+/i) === event.shiftKey &&
					shortcut.split("+").pop().toUpperCase() === event.key.toUpperCase()
				) {
					event.preventDefault();
					event.stopPropagation();
					if (shortcut_target.disabled) {
						shortcut_target = shortcut_target.closest(".radio-wrapper");
					}
					shortcut_target.click();
					shortcut_target.focus();
					return;
				}
			}
		}
	});

	// Prevent keyboard shortcuts from interfering with typing in text fields.
	// Rather than conditionally handling the shortcut, I'm conditionally removing it,
	// because _theoretically_ it's better for assistive technology to know that the shortcut isn't available.
	// (Theoretically I should also remove aria-keyshortcuts when the window isn't focused...)
	$container.on("focusin focusout", (event) => {
		if ($(event.target).is('textarea, input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="image"]):not([type="file"]):not([type="color"]):not([type="range"])')) {
			for (const control of $container.find("[aria-keyshortcuts]")) {
				control._original_aria_keyshortcuts = control._original_aria_keyshortcuts ?? control.getAttribute("aria-keyshortcuts");
				// Remove shortcuts without modifiers.
				control.setAttribute("aria-keyshortcuts",
					control.getAttribute("aria-keyshortcuts")
						.split(" ")
						.filter((shortcut) => shortcut.match(/(Alt|Ctrl|Meta)\+/i))
						.join(" ")
				);
			}
		} else {
			// Restore shortcuts.
			for (const control of $container.find("[aria-keyshortcuts]")) {
				if (control._original_aria_keyshortcuts) {
					control.setAttribute("aria-keyshortcuts", control._original_aria_keyshortcuts);
				}
			}
		}
	});
}
function handle_pointer_activation(event) {
		// console.log("handle_pointer_activation", event.type, event.target);
		$w.bringToFront();
		// Test cases where it should refocus the last focused control in the window:
		// - Click in the blank space of the window
		//   - Click in blank space again now that something's focused
		// - Click on the window title bar
		//   - Click on title bar buttons
		// - Closing a second window should focus the first window
		//   - Open a dialog window from an app window that has a tool window, then close the dialog window
		//     - @TODO: Even if the tool window has controls, it should focus the parent window, I think
		// - Clicking on a control in the window should focus said control
		// - Clicking on a disabled control in the window should focus the window
		//   - Make sure to test this with another window previously focused
		// - Simulated clicks (important for JS Paint's eye gaze and speech recognition modes)
		// - (@TODO: Should clicking a child window focus the parent window?)
		// - After potentially selecting text but not selecting anything
		// It should NOT refocus when:
		// - Clicking on a control in a different window
		// - When other event handlers set focus
		//   - Using the keyboard to focus something outside the window, such as a menu popup
		//   - Clicking a control that focuses something outside the window
		//     - Button that opens another window (e.g. Recursive Dialog button in tests)
		//     - Button that focuses a control in another window (e.g. Focus Other button in tests)
		// - Trying to select text

		// Wait for other pointerdown handlers and default behavior, and focusin events.
		requestAnimationFrame(() => {
			const last_focus_global = last_focus_by_container.get(window);
			// const last_focus_in_window = last_focus_by_container.get($w.$content[0]);
			// console.log("a tick after", event.type, { last_focus_in_window, last_focus_global, activeElement: document.activeElement, win_elem: $w[0] });
			// console.log("did focus change?", document.activeElement !== last_focus_global);

			// If something programmatically got focus, don't refocus.
			if (
				document.activeElement &&
				document.activeElement !== document &&
				document.activeElement !== document.body &&
				document.activeElement !== $w.$content[0] &&
				document.activeElement !== last_focus_global
			) {
				return;
			}
			// If menus got focus, don't refocus.
			if (document.activeElement?.closest?.(".menus, .menu-popup")) {
				// console.log("click in menus");
				return;
			}

			// If the element is selectable, wait until the click is done and see if anything was selected first.
			// This is a bit of a weird compromise, for now.
			const target_style = getComputedStyle(event.target);
			if (target_style.userSelect !== "none") {
				// Immediately show the window as focused, just don't refocus a specific control.
				$w.$content.focus();

				$w.one("pointerup pointercancel", () => {
					requestAnimationFrame(() => { // this seems to make it more reliable in regards to double clicking
						if (!getSelection().toString().trim()) {
							refocus();
						}
					});
				});
				return;
			}
			// Set focus to the last focused control, which should be updated if a click just occurred.
			refocus();
		});
	}
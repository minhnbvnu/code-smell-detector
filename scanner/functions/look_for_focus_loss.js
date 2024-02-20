function look_for_focus_loss() {
		// Welcome to Heuristic Hurdles! I'm your host, Hacky Hairy. Today we're going to be detecting Alt+Tab.
		// Alt+Tab is a common shortcut for switching between windows, but we can't actually intercept it.
		// In fact, the browser doesn't even know about it. It's handled by the window manager directly.
		// We'll have to pick another shortcut, but who's going to know about it? Wouldn't it be nice if we could at least detect Alt+Tab,
		// to inform users of the new shortcut? How are we going to do that, in mere JavaScript?
		// Heuristics! *queue Heuristic Hurdles theme song*

		// console.log("alt_held", alt_held, "!top.document.hasFocus()", !top.document.hasFocus(), "top.document.hasFocus()", top.document.hasFocus(), "top.document", top.document, "top.activeElement", top.document.activeElement);
		if (alt_held && !top.document.hasFocus()) {
			// Some things like closing a window with Alt+4 can cause the document to lose focus, without Alt+Tab.
			// But if the window's really lost focus, we shouldn't be able to focus an element in it to focus the document.
			// So we can use that to refine the heuristic.
			if (
				!top.document.activeElement ||
				top.document.activeElement === top.document.body ||
				top.document.activeElement === top.document.documentElement
			) {
				// try focusing the document (or window, rather)
				top.focus();
				if (top.document.hasFocus()) {
					// console.log("Focused document");
					return;
				} else {
					// console.log("Couldn't focus document, so you've probably Alt+Tabbed");
				}
			} else {
				// console.log("Active element is", top.document.activeElement, " despite hasFocus() being false so you've probably Alt+Tabbed");
			}

			// False positives:
			// - Alt+D focuses the address bar in Chrome
			// - Hold Alt and click outside the browser window
			// - Alt+Space shows the system window menu on some platforms, and on Ubuntu XFCE in Firefox this causes a false positive but not in Chrome apparently (weird!)
			// - Alt+(number) focuses a tab in Chrome, but it actually lets us cancel it; @TODO: detect this as not an Alt+Tab (could use a timeout after any key pressed while holding Alt)

			clearInterval(iid);
			alt_held = false;

			if (Task.all_tasks.length < 2) {
				return;
			}
			if (!notice_shown) {
				clippy.load("Clippy", function (loaded_agent) {
					agent = loaded_agent;
					agent.show();
					const message = "It looks like you're trying to switch windows.\n\nUse Alt+1 instead of Alt+Tab within the 98.js desktop.\n\nAlso, use Alt+4 instead of Alt+F4 to close windows.";
					agent.speak(message, true);
					// held message causes double click to not animate Clippy, for some reason (even after message is cleared)
					$(agent._el).one("dblclick", function () {
						agent.stopCurrent();
						agent.animate();
					});
				});
				notice_shown = true;
			}
		}
	}
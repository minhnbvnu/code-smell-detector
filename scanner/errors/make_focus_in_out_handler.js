			return function handle_focus_in_out(event) {
				const container_node = logical_container_el.tagName == "IFRAME" ? logical_container_el.contentDocument : logical_container_el;
				const document = container_node.ownerDocument ?? container_node;
				// is this equivalent?
				// const document = logical_container_el.tagName == "IFRAME" ? logical_container_el.contentDocument : logical_container_el.ownerDocument;

				// console.log(`handling ${event.type} for container`, container_el);
				let newly_focused = event ? (event.type === "focusout" || event.type === "blur") ? event.relatedTarget : event.target : document.activeElement;
				if (event?.type === "blur") {
					newly_focused = null; // only handle iframe
				}

				// console.log(`[${$w.title()}] (is_root=${is_root})`, `newly_focused is (preliminarily)`, element_to_string(newly_focused), `\nlogical_container_el`, logical_container_el, `\ncontainer_node`, container_node, `\ndocument.activeElement`, document.activeElement, `\ndocument.hasFocus()`, document.hasFocus(), `\ndocument`, document);

				// Iframes are stingy about focus events, so we need to check if focus is actually within an iframe.
				if (
					document.activeElement &&
					document.activeElement.tagName === "IFRAME" &&
					(event?.type === "focusout" || event?.type === "blur") &&
					!newly_focused // doesn't exist for security reasons in this case
				) {
					newly_focused = document.activeElement;
					// console.log(`[${$w.title()}] (is_root=${is_root})`, `newly_focused is (actually)`, element_to_string(newly_focused));
				}

				const outside_or_at_exactly =
					!newly_focused ||
					// contains() only works with DOM nodes (elements and documents), not window objects.
					// Since container_node is a DOM node, it will never have a Window inside of it (ignoring iframes).
					newly_focused.window === newly_focused || // is a Window object (cross-frame test)
					!container_node.contains(newly_focused); // Note: node.contains(node) === true
				const firmly_outside = outside_or_at_exactly && container_node !== newly_focused;

				// console.log(`[${$w.title()}] (is_root=${is_root})`, `outside_or_at_exactly=${outside_or_at_exactly}`, `firmly_outside=${firmly_outside}`);
				if (firmly_outside && is_root) {
					if (!options.toolWindow) { // PATCHED
						stopShowingAsFocused();
					}
				}
				if (
					!outside_or_at_exactly &&
					newly_focused.tagName !== "HTML" &&
					newly_focused.tagName !== "BODY" &&
					newly_focused !== container_node &&
					!newly_focused.matches(".window-content") &&
					!newly_focused.closest(".menus") &&
					!newly_focused.closest(".window-titlebar")
				) {
					last_focus_by_container.set(logical_container_el, newly_focused); // overwritten for iframes below
					debug_focus_tracking(document, container_node, newly_focused, is_root);
				}

				if (
					!outside_or_at_exactly &&
					newly_focused.tagName === "IFRAME"
				) {
					const iframe = newly_focused;
					// console.log("iframe", iframe, onfocusin_by_container.has(iframe));
					try {
						const focus_in_iframe = iframe.contentDocument.activeElement;
						if (
							focus_in_iframe &&
							focus_in_iframe.tagName !== "HTML" &&
							focus_in_iframe.tagName !== "BODY" &&
							!focus_in_iframe.closest(".menus")
						) {
							// last_focus_by_container.set(logical_container_el, iframe); // done above
							last_focus_by_container.set(iframe, focus_in_iframe);
							debug_focus_tracking(iframe.contentDocument, iframe.contentDocument, focus_in_iframe, is_root);
						}
					} catch (e) {
						warn_iframe_access(iframe, e);
					}
				}


				// For child windows and menu popups, follow "semantic parent" chain.
				// Menu popups and child windows aren't descendants of the window they belong to,
				// but should keep the window shown as focused.
				// (In principle this sort of feature could be useful for focus tracking*,
				// but right now it's only for child windows and menu popups, which should not be tracked for refocus,
				// so I'm doing this after last_focus_by_container.set, for now anyway.)
				// ((*: and it may even be surprising if it doesn't work, if one sees the attribute on menus and attempts to use it.
				// But who's going to see that? The menus close so it's a pain to see the DOM structure! :P **))
				// (((**: without window.debugKeepMenusOpen)))
				if (is_root) {
					do {
						// if (!newly_focused?.closest) {
						// 	console.warn("what is this?", newly_focused);
						// 	break;
						// }
						const waypoint = newly_focused?.closest?.("[data-semantic-parent]");
						if (waypoint) {
							const id = waypoint.dataset.semanticParent;
							const parent = waypoint.ownerDocument.getElementById(id);
							// console.log("following semantic parent, from", newly_focused, "\nto", parent, "\nvia", waypoint);
							newly_focused = parent;
							if (!parent) {
								console.warn("semantic parent not found with id", id);
								break;
							}
						} else {
							break;
						}
					} while (true);
				}

				// Note: allowing showing window as focused from listeners inside iframe (non-root) too,
				// in order to handle clicking an iframe when the browser window was not previously focused (e.g. after reload)
				if (
					newly_focused &&
					newly_focused.window !== newly_focused && // cross-frame test for Window object
					container_node.contains(newly_focused)
				) {
					if (!options.toolWindow) { // PATCHED
						showAsFocused();
					}
					$w.bringToFront();
					if (!is_root) {
						// trigger focusin events for iframes
						// @TODO: probably don't need showAsFocused() here since it'll be handled externally (on this simulated focusin),
						// and might not need a lot of other logic frankly if I'm simulating focusin events
						let el = logical_container_el;
						while (el) {
							// console.log("dispatching focusin event for", el);
							el.dispatchEvent(new Event("focusin", {
								bubbles: true,
								target: el,
								view: el.ownerDocument.defaultView,
							}));
							el = el.currentView?.frameElement;
						}
					}
				} else if (is_root) {
					if (!options.toolWindow) { // PATCHED
						stopShowingAsFocused();
					}
				}
			}
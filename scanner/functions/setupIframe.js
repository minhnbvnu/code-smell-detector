function setupIframe(iframe) {
			if (!focus_update_handlers_by_container.has(iframe)) {
				const iframe_update_focus = make_focus_in_out_handler(iframe, false);
				// this also operates as a flag to prevent multiple handlers from being added, or waiting for the iframe to load duplicately
				focus_update_handlers_by_container.set(iframe, iframe_update_focus);

				// @TODO: try removing setTimeout(s)
				setTimeout(() => { // for iframe src to be set? I forget.
					// Note: try must be INSIDE setTimeout, not outside, to work.
					try {
						const wait_for_iframe_load = (callback) => {
							// Note: error may occur accessing iframe.contentDocument; this must be handled by the caller.
							// To that end, this function must access it synchronously, to allow the caller to handle the error.
							if (iframe.contentDocument.readyState == "complete") {
								callback();
							} else {
								// iframe.contentDocument.addEventListener("readystatechange", () => {
								// 	if (iframe.contentDocument.readyState == "complete") {
								// 		callback();
								// 	}
								// });
								setTimeout(() => {
									wait_for_iframe_load(callback);
								}, 100);
							}
						};
						wait_for_iframe_load(() => {
							// console.log("adding focusin/focusout/blur/focus for iframe", iframe);
							iframe.contentWindow.addEventListener("focusin", iframe_update_focus);
							iframe.contentWindow.addEventListener("focusout", iframe_update_focus);
							iframe.contentWindow.addEventListener("blur", iframe_update_focus);
							iframe.contentWindow.addEventListener("focus", iframe_update_focus);
							observeIframes(iframe.contentDocument);
						});
					} catch (error) {
						warn_iframe_access(iframe, error);
					}
				}, 100);
			}
		}
function observeIframes(container_node) {
			const observer = new MutationObserver((mutations) => {
				for (const mutation of mutations) {
					for (const node of mutation.addedNodes) {
						if (node.tagName == "IFRAME") {
							setupIframe(node);
						}
					}
				}
			});
			observer.observe(container_node, { childList: true, subtree: true });
			// needed in recursive calls (for iframes inside iframes)
			// (for the window, it shouldn't be able to have iframes yet)
			for (const iframe of container_node.querySelectorAll("iframe")) {
				setupIframe(iframe);
			}
		}
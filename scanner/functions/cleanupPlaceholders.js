function cleanupPlaceholders(range) {
		if (window.$_alohaPlaceholder && !isInsidePlaceholder(range)) {
			if (0 === window.$_alohaPlaceholder.html().replace(/^(&nbsp;)*$/, '').length) {
				window.$_alohaPlaceholder.remove();
			}

			window.$_alohaPlaceholder = null;
		}
	}
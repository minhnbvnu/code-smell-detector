function processPaths (currentUrl) {
		// Declare current URL index
		let currentIndex;
    var SUFPaths;
		// Check if paths was not already generated or if they are not matching the current URL
		if (typeof SUFPaths === 'undefined' || (currentIndex = SUFPaths.indexOf(currentUrl)) === -1) {
			// Set path to current tab
			SUFPaths = computePaths(currentUrl);
			// Set initial pointer position
			var SUFPointer = 0;
			// Stop path processing
			//return;
		}
		// Define pointer set status
		let pointerSet = false;
		// Get URL in urlbar
		let urlbarUrl = gURLBar.untrimmedValue;
		// Check urlbar URL
		if (urlbarUrl !== null) {
			// Check if urlbar URL maches one of path
			let urlbarIndex = SUFPaths.indexOf(urlbarUrl);
			if (urlbarIndex !== -1) {
				// Set pointer to urlbar URL index
				SUFPointer = urlbarIndex;
				// Mark pointer as set
				pointerSet = true;
			} else {
				// Compute paths for urlbar URL
				let urlbarPaths = computePaths(urlbarUrl);
				// Check each computed paths from urlbar URL
				for (let urlbarPathsIndex = 1, urlbarPathsCount = urlbarPaths.length; urlbarPathsIndex<urlbarPathsCount; urlbarPathsIndex++) {
					// Check if urlbar URL path matches one of computed paths
					urlbarIndex = SUFPaths.indexOf(urlbarPaths[urlbarPathsIndex]);
					if (urlbarIndex !== -1) {
						// Set pointer to urlbar URL index
						SUFPointer = urlbarIndex;
						// Mark pointer as set
						pointerSet = true;
						break;
					}
				}
			}
		}
		// Check if pointer was set
		if (!pointerSet) {
			// Set pointer to current URL index
			SUFPointer = currentIndex;
		}
    return { SUFPaths: SUFPaths,
             SUFPointer: SUFPointer };
	}
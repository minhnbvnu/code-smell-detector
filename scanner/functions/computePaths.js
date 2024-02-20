function computePaths (path) {
		// Initialize paths
		let paths = new Array();
		// Prevent path computation on about page
		if (path.substr(0, 6) !== 'about:') {
			// Create paths
			while (path != null) {
				paths.push(path);
				path = computeUpperUrl(path);
			}
		}
		// Return computed paths
		return paths;
	}
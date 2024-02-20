function generateStyles(targets) {
	if (targets.length > 0) {
		// generate style
		var current = targets.pop();
		xml2tss.updateFile(
			current.view_path,
			current.style_path,
			function(err, ok) {
				if (ok) {
					logger.info('Style generated: ' + current.style);
				}
				generateStyles(targets);
			}
		);
	}
}
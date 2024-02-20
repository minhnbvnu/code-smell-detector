function updateFilesWithBuildLog(src, dst, opts) {
	// filter on retrictionPath
	if (opts.restrictionPath === null || _.find(opts.restrictionPath, function(f) {return f.indexOf(src) === 0;})) {
		var updatedFiles = U.updateFiles(src, dst, _.extend({ isNew: buildLog.isNew }, opts));

		if (typeof updatedFiles == 'object' && updatedFiles.length > 0 && opts.restrictionPath !== null) {
			fileRestrictionUpdatedFiles = _.union(fileRestrictionUpdatedFiles, updatedFiles);
		}
	}
}
function systemExecuteFile(file_path) {
	// execute file with default handler
	// like the START command in CMD.EXE

	withFilesystem(function () {
		var fs = BrowserFS.BFSRequire("fs");
		fs.stat(file_path, function (err, stats) {
			if (err) {
				return alert("Failed to get info about " + file_path + "\n\n" + err);
			}
			if (stats.isDirectory()) {
				Explorer(file_path);
			} else {
				var file_extension = file_extension_from_path(file_path);
				var program = file_extension_associations[file_extension.toLowerCase()];
				if (program) {
					if (!program.acceptsFilePaths) {
						alert(program.name + " does not support opening files via the virtual filesystem yet");
						return;
					}
					program(file_path);
				} else {
					alert("No program is associated with " + file_extension + " files");
				}
			}
		});
	});
}
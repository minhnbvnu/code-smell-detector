function executeFile(file_path) {
	// I don't think this withFilesystem is necessary
	withFilesystem(function () {
		var fs = BrowserFS.BFSRequire("fs");
		fs.stat(file_path, function (err, stats) {
			if (err) {
				return alert("Failed to get info about " + file_path + "\n\n" + err);
			}
			if (stats.isDirectory()) {
				go_to(file_path);
			} else {
				// (can either check frameElement or parent !== window, but not parent by itself, because `parent === window` when there's no actual parent frame)
				if (frameElement) {
					const systemExecuteFile = parent.systemExecuteFile || parent.parent.systemExecuteFile; // dunno if I'll keep the folder view in an iframe
					if (systemExecuteFile) {
						systemExecuteFile(file_path);
					} else {
						alert("Failed to execute " + file_path + "\n\n" + "systemExecuteFile not found");
					}
				} else {
					alert("Can't open files in standalone mode. Explorer must be run in a desktop.");
				}
			}
		});
	});
}
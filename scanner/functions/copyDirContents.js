function copyDirContents(files) {
	                    var file = files.shift();
	                    if (!file) {
	                        return cb();
	                    }
	                    var oldFile = path.resolve(oldPath, file);
	                    var newFile = path.resolve(newPath, file);
	                    // Recursion! Should work for any nested files / folders.
	                    self.rename(oldFile, newFile, function (err) {
	                        if (err) {
	                            return cb(err);
	                        }
	                        copyDirContents(files);
	                    });
	                }
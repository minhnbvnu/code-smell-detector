function copyNextFile(err) {
	                            if (err) {
	                                cb(err);
	                            }
	                            else if (i < files.length) {
	                                copyItem(path.join(p, files[i]), copyNextFile);
	                                i++;
	                            }
	                            else {
	                                cb();
	                            }
	                        }
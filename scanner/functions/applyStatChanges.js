function applyStatChanges() {
	                // Check if mode changed.
	                fd.stat(function (e, stats) {
	                    if (e) {
	                        cb(e);
	                    }
	                    else {
	                        if (stats.mode !== remoteStats.mode) {
	                            fd.chmod(remoteStats.mode, function (e) {
	                                cb(e, fd);
	                            });
	                        }
	                        else {
	                            cb(e, fd);
	                        }
	                    }
	                });
	            }
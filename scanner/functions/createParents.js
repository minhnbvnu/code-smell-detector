function createParents() {
	            if (!toCreate.length) {
	                return cb();
	            }
	            var dir = toCreate.pop();
	            self._readable.stat(dir, false, function (err, stats) {
	                // stop if we couldn't read the dir
	                if (!stats) {
	                    return cb();
	                }
	                self._writable.mkdir(dir, stats.mode, function (err) {
	                    if (err) {
	                        return cb(err);
	                    }
	                    createParents();
	                });
	            });
	        }
function statDone(err, stat) {
	            if (err) {
	                toCreate.push(parent);
	                parent = path.dirname(parent);
	                self._writable.stat(parent, false, statDone);
	            }
	            else {
	                createParents();
	            }
	        }
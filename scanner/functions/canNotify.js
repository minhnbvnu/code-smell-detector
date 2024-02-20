function canNotify(value) {
	  if (!value) {
	    var why = value === false ? 'blocked' : 'unacknowledged';
	    var reason = 'not permitted by user (' + why + ')';
	    return Promise.reject(new Error(reason));
	  }

	  return Promise.resolve();
	}
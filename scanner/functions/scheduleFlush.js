function scheduleFlush() {
	  setTimeout(function () {
	    for (var i = 0; i < queue.length; i++) {
	      var entry = queue[i];

	      var payload = entry.payload;

	      payload.guid = payload.key + payload.id;
	      payload.childGuid = payload.key + payload.childId;
	      if (payload.error) {
	        payload.stack = payload.error.stack;
	      }

	      config['trigger'](entry.name, entry.payload);
	    }
	    queue.length = 0;
	  }, 50);
	}
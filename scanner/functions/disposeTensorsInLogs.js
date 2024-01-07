function disposeTensorsInLogs(logs) {
	  if (logs == null) {
	    return;
	  }

	  for (var key in logs) {
	    var value = logs[key];

	    if (typeof value !== 'number') {
	      value.dispose();
	    }
	  }
	}
function getKernelsForBackend(backendName) {
	  var it = kernelRegistry.entries();
	  var result = [];

	  while (true) {
	    var _it$next = it.next(),
	        done = _it$next.done,
	        value = _it$next.value;

	    if (done) {
	      break;
	    }

	    var key = value[0],
	        config = value[1];

	    var _key$split = key.split('_'),
	        backend = _key$split[0];

	    if (backend === backendName) {
	      result.push(config);
	    }
	  }

	  return result;
	}
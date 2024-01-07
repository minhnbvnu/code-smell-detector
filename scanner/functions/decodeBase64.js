function decodeBase64(text) {
	  var global = env().global;

	  if (typeof global.atob !== 'undefined') {
	    return global.atob(text);
	  } else if (typeof Buffer !== 'undefined') {
	    return new Buffer(text, 'base64').toString();
	  } else {
	    throw new Error('Unable to decode base64 in this environment. ' + 'Missing built-in atob() or Buffer()');
	  }
	}
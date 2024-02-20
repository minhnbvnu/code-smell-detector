function arrayResult(_) {
	  var length = _.length;
	  var args = new Array(length - 1);

	  for (var i = 1; i < length; i++) {
	    args[i - 1] = _[i];
	  }

	  return args;
	}
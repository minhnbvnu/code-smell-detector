function getOptions(opts) {
	  var options = {};
	  for (var key in defaultOptions) {
	    options[key] = opts && key in opts ? opts[key] : defaultOptions[key];
	  }
	  return options;
	}
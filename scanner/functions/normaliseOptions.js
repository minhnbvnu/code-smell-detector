function normaliseOptions() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  for (var key in options) {
	    var val = options[key];
	    if (val == null) continue;

	    var opt = _config2.default[key];
	    if (opt && opt.alias) opt = _config2.default[opt.alias];
	    if (!opt) continue;

	    var parser = parsers[opt.type];
	    if (parser) val = parser(val);

	    options[key] = val;
	  }

	  return options;
	}
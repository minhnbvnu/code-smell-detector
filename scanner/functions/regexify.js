function regexify(val) {
	  if (!val) {
	    return new RegExp(/.^/);
	  }

	  if (Array.isArray(val)) {
	    val = new RegExp(val.map(_escapeRegExp2.default).join("|"), "i");
	  }

	  if (typeof val === "string") {
	    val = (0, _slash2.default)(val);

	    if ((0, _startsWith2.default)(val, "./") || (0, _startsWith2.default)(val, "*/")) val = val.slice(2);
	    if ((0, _startsWith2.default)(val, "**/")) val = val.slice(3);

	    var regex = _minimatch2.default.makeRe(val, { nocase: true });
	    return new RegExp(regex.source.slice(1, -1), "i");
	  }

	  if ((0, _isRegExp2.default)(val)) {
	    return val;
	  }

	  throw new TypeError("illegal type for regexify");
	}
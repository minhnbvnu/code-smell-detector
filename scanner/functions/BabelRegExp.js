function BabelRegExp(re, flags, groups) {
	    var _this = _RegExp.call(this, re, flags);

	    _groups.set(_this, groups || _groups.get(re));

	    return _this;
	  }
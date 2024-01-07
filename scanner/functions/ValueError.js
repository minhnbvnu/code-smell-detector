function ValueError(message) {
	    var _this3;

	    _this3 = _Error3.call(this, message) || this; // Set the prototype explicitly.

	    Object.setPrototypeOf(_assertThisInitialized(_this3), ValueError.prototype);
	    return _this3;
	  }
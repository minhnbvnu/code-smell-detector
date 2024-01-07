function RuntimeError(message) {
	    var _this2;

	    _this2 = _Error2.call(this, message) || this; // Set the prototype explicitly.

	    Object.setPrototypeOf(_assertThisInitialized(_this2), RuntimeError.prototype);
	    return _this2;
	  }
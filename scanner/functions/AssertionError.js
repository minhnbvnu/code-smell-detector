function AssertionError(message) {
	    var _this5;

	    _this5 = _Error5.call(this, message) || this; // Set the prototype explicitly.

	    Object.setPrototypeOf(_assertThisInitialized(_this5), AssertionError.prototype);
	    return _this5;
	  }
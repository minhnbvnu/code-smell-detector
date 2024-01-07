function IndexError(message) {
	    var _this6;

	    _this6 = _Error6.call(this, message) || this; // Set the prototype explicitly.

	    Object.setPrototypeOf(_assertThisInitialized(_this6), IndexError.prototype);
	    return _this6;
	  }
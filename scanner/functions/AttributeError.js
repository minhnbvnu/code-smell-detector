function AttributeError(message) {
	    var _this;

	    _this = _Error.call(this, message) || this; // Set the prototype explicitly.

	    Object.setPrototypeOf(_assertThisInitialized(_this), AttributeError.prototype);
	    return _this;
	  }
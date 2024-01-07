function NotImplementedError(message) {
	    var _this4;

	    _this4 = _Error4.call(this, message) || this; // Set the prototype explicitly.

	    Object.setPrototypeOf(_assertThisInitialized(_this4), NotImplementedError.prototype);
	    return _this4;
	  }
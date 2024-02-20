function PromiseHash(Constructor, object) {
	    var abortOnReject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	    var label = arguments[3];
	    return _possibleConstructorReturn$1(this, _Enumerator.call(this, Constructor, object, abortOnReject, label));
	  }
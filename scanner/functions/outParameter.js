function outParameter(value) {
		var _value = value || null;
		var reference = function reference(value) {
			if (Array.prototype.slice.apply(arguments).length) {
				_value = value;
			}
			return _value;
		};
		return reference;
	}
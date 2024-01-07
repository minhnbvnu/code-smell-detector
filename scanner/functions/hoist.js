function hoist() {
	  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.scope;

	  var hoister = new _hoister2.default(this, scope);
	  return hoister.run();
	}
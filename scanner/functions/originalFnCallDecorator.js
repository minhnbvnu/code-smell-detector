function originalFnCallDecorator(fn, fnName) {
		return function() {
			fn.apply(this, arguments);
			if (typeof _console[fnName] === 'function') {
				_console[fnName].apply(console, arguments);
			}
		};
	}
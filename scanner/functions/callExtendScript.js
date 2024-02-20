function callExtendScript(method) {
		var args = [].splice.call(arguments,1);
		var callback = undefined;

		var params = [];
		for(var idx in args) {
			var arg = args[idx];
			if(typeof(arg) == 'function') {
				callback = arg;
			} else {
				params.push(escapeArgument(arg));
			}
		}
	
		var functionArgs = params.length ? '("' + params.join('","') + '")' : '()';
		var script = method + functionArgs;
		
		// evaluate against the ExtendScript context.
		CS_INTERFACE.evalScript(script, callback);
	}
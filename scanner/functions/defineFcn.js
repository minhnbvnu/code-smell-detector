function defineFcn(name, isSync, numArgs) {
	    if (isSync) {
	        return function () {
	            var args = [], len = arguments.length;
	            while ( len-- ) args[ len ] = arguments[ len ];
	
	            var path$$1 = args[0];
	            var rv = this._getFs(path$$1);
	            args[0] = rv.path;
	            try {
	                return rv.fs[name].apply(rv.fs, args);
	            }
	            catch (e) {
	                this.standardizeError(e, rv.path, path$$1);
	                throw e;
	            }
	        };
	    }
	    else {
	        return function () {
	            var this$1 = this;
	            var args = [], len = arguments.length;
	            while ( len-- ) args[ len ] = arguments[ len ];
	
	            var path$$1 = args[0];
	            var rv = this._getFs(path$$1);
	            args[0] = rv.path;
	            if (typeof args[args.length - 1] === 'function') {
	                var cb = args[args.length - 1];
	                args[args.length - 1] = function () {
	                    var args = [], len = arguments.length;
	                    while ( len-- ) args[ len ] = arguments[ len ];
	
	                    if (args.length > 0 && args[0] instanceof ApiError) {
	                        this$1.standardizeError(args[0], rv.path, path$$1);
	                    }
	                    cb.apply(null, args);
	                };
	            }
	            return rv.fs[name].apply(rv.fs, args);
	        };
	    }
	}
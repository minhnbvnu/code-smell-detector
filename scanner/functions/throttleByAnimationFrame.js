function throttleByAnimationFrame(fn) {
	    var requestId = void 0;
	    var later = function later(args) {
	        return function () {
	            requestId = null;
	            fn.apply(undefined, (0, _toConsumableArray3['default'])(args));
	        };
	    };
	    var throttled = function throttled() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        if (requestId == null) {
	            requestId = reqAnimFrame(later(args));
	        }
	    };
	    throttled.cancel = function () {
	        return (0, _getRequestAnimationFrame.cancelRequestAnimationFrame)(requestId);
	    };
	    return throttled;
	}
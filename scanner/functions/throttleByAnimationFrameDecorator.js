function throttleByAnimationFrameDecorator() {
	    return function (target, key, descriptor) {
	        var fn = descriptor.value;
	        var definingProperty = false;
	        return {
	            configurable: true,
	            get: function get() {
	                if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
	                    return fn;
	                }
	                var boundFn = throttleByAnimationFrame(fn.bind(this));
	                definingProperty = true;
	                Object.defineProperty(this, key, {
	                    value: boundFn,
	                    configurable: true,
	                    writable: true
	                });
	                definingProperty = false;
	                return boundFn;
	            }
	        };
	    };
	}
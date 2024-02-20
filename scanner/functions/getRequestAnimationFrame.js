function getRequestAnimationFrame() {
	    if (typeof window === 'undefined') {
	        return function () {};
	    }
	    if (window.requestAnimationFrame) {
	        // https://github.com/vuejs/vue/issues/4465
	        return window.requestAnimationFrame.bind(window);
	    }
	    var prefix = availablePrefixs.filter(function (key) {
	        return key + 'RequestAnimationFrame' in window;
	    })[0];
	    return prefix ? window[prefix + 'RequestAnimationFrame'] : requestAnimationFramePolyfill();
	}
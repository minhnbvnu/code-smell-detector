function cancelRequestAnimationFrame(id) {
	    if (typeof window === 'undefined') {
	        return null;
	    }
	    if (window.cancelAnimationFrame) {
	        return window.cancelAnimationFrame(id);
	    }
	    var prefix = availablePrefixs.filter(function (key) {
	        return key + 'CancelAnimationFrame' in window || key + 'CancelRequestAnimationFrame' in window;
	    })[0];
	    return prefix ? (window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame']).call(this, id) : clearTimeout(id);
	}
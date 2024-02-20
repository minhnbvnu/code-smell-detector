function getOffsetTop(element) {
	    if (!element) {
	        return 0;
	    }
	    if (!element.getClientRects().length) {
	        return 0;
	    }
	    var rect = element.getBoundingClientRect();
	    if (rect.width || rect.height) {
	        var doc = element.ownerDocument;
	        var docElem = doc.documentElement;
	        return rect.top - docElem.clientTop;
	    }
	    return rect.top;
	}
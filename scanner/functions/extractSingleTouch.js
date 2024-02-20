function extractSingleTouch(_nativeEvent) {
	    var nativeEvent = _nativeEvent;
	    if (nativeEvent.nativeEvent) {
	        nativeEvent = nativeEvent.nativeEvent;
	    }
	    var touches = nativeEvent.touches;
	    var changedTouches = nativeEvent.changedTouches;
	    var hasTouches = touches && touches.length > 0;
	    var hasChangedTouches = changedTouches && changedTouches.length > 0;
	    return !hasTouches && hasChangedTouches ? changedTouches[0] : hasTouches ? touches[0] : nativeEvent;
	}
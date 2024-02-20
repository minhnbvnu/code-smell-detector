function shouldFirePress(e) {
	    var nativeEvent = e.nativeEvent,
	        $pressSeq = e.$pressSeq;

	    if (!nativeEvent.$stopPressSeq) {
	        return true;
	    }
	    return nativeEvent.$stopPressSeq >= $pressSeq;
	}
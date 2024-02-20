function willConnectNext(charContextParams) {
	    if (isIsolatedArabicChar(charContextParams.current)) { return false; }
	    for (var i = 0; i < charContextParams.lookahead.length; i++) {
	        var nextChar = charContextParams.lookahead[i];
	        var tashkeel = isTashkeelArabicChar(nextChar);
	        if (!tashkeel) { return true; }
	    }
	    return false;
	}
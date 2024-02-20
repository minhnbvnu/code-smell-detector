function willConnectPrev(charContextParams) {
	    var backtrack = [].concat(charContextParams.backtrack);
	    for (var i = backtrack.length - 1; i >= 0; i--) {
	        var prevChar = backtrack[i];
	        var isolated = isIsolatedArabicChar(prevChar);
	        var tashkeel = isTashkeelArabicChar(prevChar);
	        if (!isolated && !tashkeel) { return true; }
	        if (isolated) { return false; }
	    }
	    return false;
	}
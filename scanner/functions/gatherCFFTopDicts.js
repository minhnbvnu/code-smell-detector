function gatherCFFTopDicts(data, start, cffIndex, strings) {
	    var topDictArray = [];
	    for (var iTopDict = 0; iTopDict < cffIndex.length; iTopDict += 1) {
	        var topDictData = new DataView(new Uint8Array(cffIndex[iTopDict]).buffer);
	        var topDict = parseCFFTopDict(topDictData, strings);
	        topDict._subrs = [];
	        topDict._subrsBias = 0;
	        topDict._defaultWidthX = 0;
	        topDict._nominalWidthX = 0;
	        var privateSize = topDict.private[0];
	        var privateOffset = topDict.private[1];
	        if (privateSize !== 0 && privateOffset !== 0) {
	            var privateDict = parseCFFPrivateDict(data, privateOffset + start, privateSize, strings);
	            topDict._defaultWidthX = privateDict.defaultWidthX;
	            topDict._nominalWidthX = privateDict.nominalWidthX;
	            if (privateDict.subrs !== 0) {
	                var subrOffset = privateOffset + privateDict.subrs;
	                var subrIndex = parseCFFIndex(data, subrOffset + start);
	                topDict._subrs = subrIndex.objects;
	                topDict._subrsBias = calcCFFSubroutineBias(topDict._subrs);
	            }
	            topDict._privateDict = privateDict;
	        }
	        topDictArray.push(topDict);
	    }
	    return topDictArray;
	}
function formatHexExtended(i,length,padString){
		h = i.toString(36).toUpperCase();
		if (length && h.length<length){
			padString = padString || "0";
			while (h.length<length){
				h = padString + h;
			}
		}
		return h;
	}
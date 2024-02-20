function offsetFromString(matcher, string) {
	        var matches = (string || '').match(matcher);

	        if (matches === null) {
	            return null;
	        }

	        var chunk   = matches[matches.length - 1] || [];
	        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	        var minutes = +(parts[1] * 60) + toInt(parts[2]);

	        return minutes === 0 ?
	          0 :
	          parts[0] === '+' ? minutes : -minutes;
	    }
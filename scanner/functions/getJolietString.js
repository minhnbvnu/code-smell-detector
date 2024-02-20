function getJolietString(data, startIndex, length) {
	    if (length === 1) {
	        // Special: Root, parent, current directory are still a single byte.
	        return String.fromCharCode(data[startIndex]);
	    }
	    // UTF16-BE, which isn't natively supported by NodeJS Buffers.
	    // Length should be even, but pessimistically floor just in case.
	    var pairs = Math.floor(length / 2);
	    var chars = new Array(pairs);
	    for (var i = 0; i < pairs; i++) {
	        var pos = startIndex + (i << 1);
	        chars[i] = String.fromCharCode(data[pos + 1] | (data[pos] << 8));
	    }
	    return chars.join('');
	}
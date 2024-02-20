function parseRIFF(string){
		var offset = 0;
		var chunks = {};

		while (offset < string.length) {
			var id = string.substr(offset, 4);
			chunks[id] = chunks[id] || [];
			if (id == 'RIFF' || id == 'LIST') {
				var len = parseInt(string.substr(offset + 4, 4).split('').map(function(i){
					var unpadded = i.charCodeAt(0).toString(2);
					return (new Array(8 - unpadded.length + 1)).join('0') + unpadded
				}).join(''),2);
				var data = string.substr(offset + 4 + 4, len);
				offset += 4 + 4 + len;
				chunks[id].push(parseRIFF(data));
			} else if (id == 'WEBP') {
				// Use (offset + 8) to skip past "VP8 "/"VP8L"/"VP8X" field after "WEBP"
				chunks[id].push(string.substr(offset + 8));
				offset = string.length;
			} else {
				// Unknown chunk type; push entire payload
				chunks[id].push(string.substr(offset + 4));
				offset = string.length;
			}
		}
		return chunks;
	}
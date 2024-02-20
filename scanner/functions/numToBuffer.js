function numToBuffer(num){
		var parts = [];
		while(num > 0){
			parts.push(num & 0xff)
			num = num >> 8
		}
		return new Uint8Array(parts.reverse());
	}
function numToFixedBuffer(num, size){
		var parts = new Uint8Array(size);
		for(var i = size - 1; i >= 0; i--){
			parts[i] = num & 0xff;
			num = num >> 8;
		}
		return parts;
	}
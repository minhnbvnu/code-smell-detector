function crcUpdateLookup(value, crc) {
	        var tmp = crc ^ value;
	        crc = (crc >> 8) ^ crc16Lookup[tmp & 0xff];
	        return crc;
	    }
function CRC_update(value, crc) {
	        value <<= 8;
	        for (var i = 0; i < 8; i++) {
	            value <<= 1;
	            crc <<= 1;

	            if ((((crc ^ value) & 0x10000) != 0))
	                crc ^= CRC16_POLYNOMIAL;
	        }
	        return crc;
	    }
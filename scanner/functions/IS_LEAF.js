function IS_LEAF( n16, uint16Array ) {

    	return uint16Array[ n16 + 15 ] === 0xFFFF;

    }
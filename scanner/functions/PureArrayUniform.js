function PureArrayUniform( id, activeInfo, addr ) {

    	this.id = id;
    	this.addr = addr;
    	this.cache = [];
    	this.size = activeInfo.size;
    	this.setValue = getPureArraySetter( activeInfo.type );

    	// this.path = activeInfo.name; // DEBUG

    }
function SingleUniform( id, activeInfo, addr ) {

    	this.id = id;
    	this.addr = addr;
    	this.cache = [];
    	this.setValue = getSingularSetter( activeInfo.type );

    	// this.path = activeInfo.name; // DEBUG

    }
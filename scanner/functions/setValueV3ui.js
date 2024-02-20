function setValueV3ui( gl, v ) {

    	const cache = this.cache;

    	if ( arraysEqual( cache, v ) ) return;

    	gl.uniform3uiv( this.addr, v );

    	copyArray( cache, v );

    }
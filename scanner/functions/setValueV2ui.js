function setValueV2ui( gl, v ) {

    	const cache = this.cache;

    	if ( arraysEqual( cache, v ) ) return;

    	gl.uniform2uiv( this.addr, v );

    	copyArray( cache, v );

    }
function setValueV4i( gl, v ) {

    	const cache = this.cache;

    	if ( arraysEqual( cache, v ) ) return;

    	gl.uniform4iv( this.addr, v );

    	copyArray( cache, v );

    }
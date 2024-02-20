function setValueV3i( gl, v ) {

    	const cache = this.cache;

    	if ( arraysEqual( cache, v ) ) return;

    	gl.uniform3iv( this.addr, v );

    	copyArray( cache, v );

    }
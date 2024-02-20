function setValueV2i( gl, v ) {

    	const cache = this.cache;

    	if ( arraysEqual( cache, v ) ) return;

    	gl.uniform2iv( this.addr, v );

    	copyArray( cache, v );

    }
function setValueV4ui( gl, v ) {

    	const cache = this.cache;

    	if ( arraysEqual( cache, v ) ) return;

    	gl.uniform4uiv( this.addr, v );

    	copyArray( cache, v );

    }
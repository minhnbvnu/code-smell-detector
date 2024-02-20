function setValueV1f( gl, v ) {

    	const cache = this.cache;

    	if ( cache[ 0 ] === v ) return;

    	gl.uniform1f( this.addr, v );

    	cache[ 0 ] = v;

    }
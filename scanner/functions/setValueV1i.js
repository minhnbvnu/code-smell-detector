function setValueV1i( gl, v ) {

    	const cache = this.cache;

    	if ( cache[ 0 ] === v ) return;

    	gl.uniform1i( this.addr, v );

    	cache[ 0 ] = v;

    }
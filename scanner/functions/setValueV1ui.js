function setValueV1ui( gl, v ) {

    	const cache = this.cache;

    	if ( cache[ 0 ] === v ) return;

    	gl.uniform1ui( this.addr, v );

    	cache[ 0 ] = v;

    }
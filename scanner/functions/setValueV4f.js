function setValueV4f( gl, v ) {

    	const cache = this.cache;

    	if ( v.x !== undefined ) {

    		if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z || cache[ 3 ] !== v.w ) {

    			gl.uniform4f( this.addr, v.x, v.y, v.z, v.w );

    			cache[ 0 ] = v.x;
    			cache[ 1 ] = v.y;
    			cache[ 2 ] = v.z;
    			cache[ 3 ] = v.w;

    		}

    	} else {

    		if ( arraysEqual( cache, v ) ) return;

    		gl.uniform4fv( this.addr, v );

    		copyArray( cache, v );

    	}

    }
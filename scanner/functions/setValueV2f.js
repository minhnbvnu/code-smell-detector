function setValueV2f( gl, v ) {

    	const cache = this.cache;

    	if ( v.x !== undefined ) {

    		if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y ) {

    			gl.uniform2f( this.addr, v.x, v.y );

    			cache[ 0 ] = v.x;
    			cache[ 1 ] = v.y;

    		}

    	} else {

    		if ( arraysEqual( cache, v ) ) return;

    		gl.uniform2fv( this.addr, v );

    		copyArray( cache, v );

    	}

    }
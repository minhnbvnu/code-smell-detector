function setValueV3f( gl, v ) {

    	const cache = this.cache;

    	if ( v.x !== undefined ) {

    		if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z ) {

    			gl.uniform3f( this.addr, v.x, v.y, v.z );

    			cache[ 0 ] = v.x;
    			cache[ 1 ] = v.y;
    			cache[ 2 ] = v.z;

    		}

    	} else if ( v.r !== undefined ) {

    		if ( cache[ 0 ] !== v.r || cache[ 1 ] !== v.g || cache[ 2 ] !== v.b ) {

    			gl.uniform3f( this.addr, v.r, v.g, v.b );

    			cache[ 0 ] = v.r;
    			cache[ 1 ] = v.g;
    			cache[ 2 ] = v.b;

    		}

    	} else {

    		if ( arraysEqual( cache, v ) ) return;

    		gl.uniform3fv( this.addr, v );

    		copyArray( cache, v );

    	}

    }
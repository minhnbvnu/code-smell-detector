function setValueV2fArray( gl, v ) {

    	const data = flatten( v, this.size, 2 );

    	gl.uniform2fv( this.addr, data );

    }
function setValueV3fArray( gl, v ) {

    	const data = flatten( v, this.size, 3 );

    	gl.uniform3fv( this.addr, data );

    }
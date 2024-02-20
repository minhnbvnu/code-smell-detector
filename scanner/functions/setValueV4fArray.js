function setValueV4fArray( gl, v ) {

    	const data = flatten( v, this.size, 4 );

    	gl.uniform4fv( this.addr, data );

    }
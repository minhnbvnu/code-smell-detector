function setValueM2Array( gl, v ) {

    	const data = flatten( v, this.size, 4 );

    	gl.uniformMatrix2fv( this.addr, false, data );

    }
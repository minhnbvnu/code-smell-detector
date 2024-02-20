function setValueM3Array( gl, v ) {

    	const data = flatten( v, this.size, 9 );

    	gl.uniformMatrix3fv( this.addr, false, data );

    }
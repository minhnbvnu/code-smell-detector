function setValueM4Array( gl, v ) {

    	const data = flatten( v, this.size, 16 );

    	gl.uniformMatrix4fv( this.addr, false, data );

    }
function setValueM3( gl, v ) {

    	const cache = this.cache;
    	const elements = v.elements;

    	if ( elements === undefined ) {

    		if ( arraysEqual( cache, v ) ) return;

    		gl.uniformMatrix3fv( this.addr, false, v );

    		copyArray( cache, v );

    	} else {

    		if ( arraysEqual( cache, elements ) ) return;

    		mat3array.set( elements );

    		gl.uniformMatrix3fv( this.addr, false, mat3array );

    		copyArray( cache, elements );

    	}

    }
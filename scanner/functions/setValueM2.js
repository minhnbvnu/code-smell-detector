function setValueM2( gl, v ) {

    	const cache = this.cache;
    	const elements = v.elements;

    	if ( elements === undefined ) {

    		if ( arraysEqual( cache, v ) ) return;

    		gl.uniformMatrix2fv( this.addr, false, v );

    		copyArray( cache, v );

    	} else {

    		if ( arraysEqual( cache, elements ) ) return;

    		mat2array.set( elements );

    		gl.uniformMatrix2fv( this.addr, false, mat2array );

    		copyArray( cache, elements );

    	}

    }
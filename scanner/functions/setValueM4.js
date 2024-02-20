function setValueM4( gl, v ) {

    	const cache = this.cache;
    	const elements = v.elements;

    	if ( elements === undefined ) {

    		if ( arraysEqual( cache, v ) ) return;

    		gl.uniformMatrix4fv( this.addr, false, v );

    		copyArray( cache, v );

    	} else {

    		if ( arraysEqual( cache, elements ) ) return;

    		mat4array.set( elements );

    		gl.uniformMatrix4fv( this.addr, false, mat4array );

    		copyArray( cache, elements );

    	}

    }
function fetchAttributeLocations( gl, program ) {

    	const attributes = {};

    	const n = gl.getProgramParameter( program, 35721 );

    	for ( let i = 0; i < n; i ++ ) {

    		const info = gl.getActiveAttrib( program, i );
    		const name = info.name;

    		let locationSize = 1;
    		if ( info.type === 35674 ) locationSize = 2;
    		if ( info.type === 35675 ) locationSize = 3;
    		if ( info.type === 35676 ) locationSize = 4;

    		// console.log( 'THREE.WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i );

    		attributes[ name ] = {
    			type: info.type,
    			location: gl.getAttribLocation( program, name ),
    			locationSize: locationSize
    		};

    	}

    	return attributes;

    }
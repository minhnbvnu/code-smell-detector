function compressedTexImage2D() {

    		try {

    			gl.compressedTexImage2D.apply( gl, arguments );

    		} catch ( error ) {

    			console.error( 'THREE.WebGLState:', error );

    		}

    	}
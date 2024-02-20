function texStorage2D() {

    		try {

    			gl.texStorage2D.apply( gl, arguments );

    		} catch ( error ) {

    			console.error( 'THREE.WebGLState:', error );

    		}

    	}
function texImage2D() {

    		try {

    			gl.texImage2D.apply( gl, arguments );

    		} catch ( error ) {

    			console.error( 'THREE.WebGLState:', error );

    		}

    	}
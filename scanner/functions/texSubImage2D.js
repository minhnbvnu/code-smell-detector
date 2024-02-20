function texSubImage2D() {

    		try {

    			gl.texSubImage2D.apply( gl, arguments );

    		} catch ( error ) {

    			console.error( 'THREE.WebGLState:', error );

    		}

    	}
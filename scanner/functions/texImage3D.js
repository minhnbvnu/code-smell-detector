function texImage3D() {

    		try {

    			gl.texImage3D.apply( gl, arguments );

    		} catch ( error ) {

    			console.error( 'THREE.WebGLState:', error );

    		}

    	}